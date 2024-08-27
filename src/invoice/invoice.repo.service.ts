import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IInvoiceSchema } from './interface/schema.interface';
import { CreateInvoiceDto } from './dto';

@Injectable()
export class InvoiceRepositoryService {
  constructor(
    @InjectModel('Invoice') private invoiceModel: Model<IInvoiceSchema>,
  ) {}

  async createInvoice(createStudentDto: CreateInvoiceDto): Promise<void> {
    await new this.invoiceModel(createStudentDto).save();
  }

  async getAllInvoice(): Promise<IInvoiceSchema[]> {
    return this.invoiceModel.find<IInvoiceSchema>();
  }
  async getInvoice(id: string): Promise<IInvoiceSchema> {
    return this.invoiceModel.findById<IInvoiceSchema>(id).exec();
  }
}
