import { ApiProperty } from '@nestjs/swagger';
import { IReadInvoice } from '../interface/internal.interface';
import { ReadItemDto } from './read-item.dto';
import { Type } from '@nestjs/class-transformer';

export class ReadInvoiceDto implements IReadInvoice {
  @ApiProperty({ description: 'Invoice id' })
  id: string;

  @ApiProperty({ description: 'Invoice customer name' })
  customerName: string;

  @ApiProperty({ description: 'Invoice amount' })
  amount: number;

  @ApiProperty({ description: 'Invoice reference' })
  reference: string;

  @ApiProperty({ description: 'Invoice date' })
  date: string;

  @ApiProperty({ description: 'Invoice items', type: () => [ReadItemDto] })
  @Type(() => ReadItemDto)
  items: ReadItemDto[];
}
