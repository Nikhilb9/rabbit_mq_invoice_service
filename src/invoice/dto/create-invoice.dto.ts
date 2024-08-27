import { ApiProperty } from '@nestjs/swagger';
import { ICreateInvoice } from '../interface/internal.interface';
import { CreateItemDto } from './index';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from '@nestjs/class-validator';
import { Type } from '@nestjs/class-transformer';
import { IsArray } from 'class-validator';

export class CreateInvoiceDto implements ICreateInvoice {
  @ApiProperty({ description: 'Customer name', required: true })
  @IsString()
  @IsNotEmpty()
  customerName!: string;

  @ApiProperty({ description: 'Invoice amount', required: true })
  @IsNumber()
  @IsPositive()
  amount!: number;

  @ApiProperty({ description: 'Invoice reference', required: true })
  @IsString()
  @IsNotEmpty()
  reference!: string;

  @ApiProperty({ description: 'Invoice date', required: true })
  @IsDateString()
  @IsNotEmpty()
  date!: string;

  @ApiProperty({
    description: 'Invoice items',
    required: true,
    type: () => [CreateItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemDto)
  items: CreateItemDto[];
}
