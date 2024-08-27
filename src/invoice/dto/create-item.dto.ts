import { ApiProperty } from '@nestjs/swagger';
import { IItem } from '../interface/internal.interface';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from '@nestjs/class-validator';

export class CreateItemDto implements IItem {
  @ApiProperty({ description: 'Item sku', required: true })
  @IsNotEmpty()
  @IsString()
  sku: string;

  @ApiProperty({ description: 'Item quantity', required: true })
  @IsNumber()
  @IsPositive()
  qt: number;
}
