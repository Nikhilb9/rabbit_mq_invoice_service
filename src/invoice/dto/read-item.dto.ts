import { ApiProperty } from '@nestjs/swagger';
import { IItem } from '../interface/internal.interface';

export class ReadItemDto implements IItem {
  @ApiProperty({ description: 'Item sku' })
  sku: string;

  @ApiProperty({ description: 'Item quantity' })
  qt: number;
}
