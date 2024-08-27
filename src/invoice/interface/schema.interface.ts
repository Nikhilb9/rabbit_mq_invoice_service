import { Document } from 'mongoose';

export interface IInvoiceSchema extends Document {
  readonly customerName: string;
  readonly amount: number;
  readonly reference: string;
  readonly date: string;
  readonly items: IItemSchema[];
}

export interface IItemSchema {
  sku: string;
  qt: number;
}
