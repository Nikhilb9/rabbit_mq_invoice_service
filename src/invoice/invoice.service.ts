import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { ReadInvoiceListDto } from './dto/read-invoice-list.dto';
import { ReadInvoiceDto } from './dto/read-invoice.dto';
import { InvoiceRepositoryService } from './invoice.repo.service';
import { IInvoiceSchema } from './interface/schema.interface';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepo: InvoiceRepositoryService) {}
  async create(data: CreateInvoiceDto): Promise<void> {
    return this.invoiceRepo.createInvoice(data);
  }

  async findAll(): Promise<ReadInvoiceListDto> {
    const invoice = await this.invoiceRepo.getAllInvoice();
    return { invoices: invoice.map((item) => this.formatInvoice(item)) };
  }

  async findOne(id: string): Promise<ReadInvoiceDto> {
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
}
