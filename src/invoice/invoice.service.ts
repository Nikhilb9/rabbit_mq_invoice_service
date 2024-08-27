import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { ReadInvoiceListDto } from './dto/read-invoice-list.dto';
import { ReadInvoiceDto } from './dto/read-invoice.dto';
import { InvoiceRepositoryService } from './invoice.repo.service';
import { IInvoiceSchema } from './interface/schema.interface';
import { Cron } from '@nestjs/schedule';
import { ProducerService } from '../rabbitmq/producer.service';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly invoiceRepo: InvoiceRepositoryService,
    private readonly rabbitMQService: ProducerService,
  ) {}
  public async create(data: CreateInvoiceDto): Promise<void> {
    return this.invoiceRepo.createInvoice(data);
  }

  public async findAll(): Promise<ReadInvoiceListDto> {
    const invoice = await this.invoiceRepo.getAllInvoice();
    return { invoices: invoice.map((item) => this.formatInvoice(item)) };
  }

  public async findOne(id: string): Promise<ReadInvoiceDto> {
    const isExist = await this.invoiceRepo.getInvoice(id);

    if (!isExist) {
      throw new NotFoundException(`Invoice not found`);
    }
    return this.formatInvoice(isExist);
  }

  private formatInvoice(invoice: IInvoiceSchema): ReadInvoiceDto {
    return {
      id: invoice._id.toString(),
      customerName: invoice.customerName,
      amount: invoice.amount,
      reference: invoice.reference,
      date: invoice.date,
      items: invoice.items.map((item) => {
        return { sku: item.sku, qt: item.qt };
      }),
    };
  }

  @Cron('59 23 * * *')
  private async generateDailyReport() {
    const start = new Date();
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date();
    end.setUTCHours(23, 59, 59, 999);

    const todaySales = await this.invoiceRepo.getTodaySales(
      start.toISOString(),
      end.toISOString(),
    );

    const skuMap = new Map<string, number>();
    let count = 0;
    for (const sale of todaySales) {
      sale.items.forEach((item) => {
        if (skuMap.has(item.sku)) {
          skuMap.set(item.sku, 1 + skuMap.get(item.sku));
        } else {
          skuMap.set(item.sku, 1);
        }
      });
      count++;
    }
    const skuMapArr = [];
    skuMap.forEach((value, key) => {
      skuMapArr.push({ sku: key, value });
    });

    this.rabbitMQService.sendMessageToQueue({
      totalSales: count,
      skuSales: skuMapArr,
    });
  }
}
