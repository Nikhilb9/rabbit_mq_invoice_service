import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class InvoiceItem {
  @Prop({ required: true })
  sku: string;

  @Prop({ required: true })
  qt: number;
}

@Schema({ timestamps: true })
export class Invoice {
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  reference: string;

  @Prop({ required: true })
  date: string;

  @Prop({ type: [InvoiceItem], required: true })
  items: InvoiceItem[];
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
