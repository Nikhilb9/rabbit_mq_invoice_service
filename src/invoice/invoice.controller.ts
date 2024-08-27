import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto, ReadInvoiceListDto, ReadInvoiceDto } from './dto';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @ApiOkResponse({ status: 200 })
  @Post()
  @ApiBody({
    type: CreateInvoiceDto,
    description: 'The data for creating a new invoice',
  })
  async create(@Body() body: CreateInvoiceDto): Promise<void> {
    return this.invoiceService.create(body);
  }

  @ApiOkResponse({ status: 200, type: () => ReadInvoiceListDto })
  @Get()
  findAll(): Promise<ReadInvoiceListDto> {
    return this.invoiceService.findAll();
  }

  @ApiOkResponse({
    status: 200,
    description: 'Successful response',
    type: ReadInvoiceDto,
  })
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The unique identifier for the invoice',
  })
  findOne(@Param() param: any): Promise<ReadInvoiceDto> {
    return this.invoiceService.findOne(param.id);
  }
}
