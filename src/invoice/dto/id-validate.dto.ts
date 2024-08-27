import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InvoiceIdDto {
  @ApiProperty({ description: 'Invoice id' })
  @IsString()
  @IsNotEmpty()
  id: string;
}
