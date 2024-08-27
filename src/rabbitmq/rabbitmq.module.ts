import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [MailModule],
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService],
})
export class RabbitMQModule {}
