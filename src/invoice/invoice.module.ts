import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceSchema } from './schemas/invoice.schema';
import { InvoiceRepositoryService } from './invoice.repo.service';
import { ProducerService } from '../rabbitmq/producer.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Invoice', schema: InvoiceSchema }]),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceRepositoryService, ProducerService],
})
export class InvoiceModule {}
