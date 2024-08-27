import { ApiProperty } from '@nestjs/swagger';
import { IReadInvoiceList } from '../interface/internal.interface';
import { ReadInvoiceDto } from './read-invoice.dto';

export class ReadInvoiceListDto implements IReadInvoiceList {
  @ApiProperty({ description: 'Invoice list', type: [ReadInvoiceDto] })
  invoices: ReadInvoiceDto[];
}
