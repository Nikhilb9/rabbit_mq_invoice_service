import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';

@Injectable()
export class ProducerService {
  private channelWrapper: ChannelWrapper;
  constructor() {
    const connection = amqp.connect(['amqp://localhost']);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue('sales_report_queue', { durable: true });
      },
    });
  }

  async sendMessageToQueue(data: {
    totalSales: number;
    skuSales: { sku: string; value: number }[];
  }) {
    try {
      await this.channelWrapper.sendToQueue(
        'sales_report_queue',
        Buffer.from(JSON.stringify(data)),
        {
          persistent: true,
        },
      );
    } catch (error) {
      throw new HttpException(
        `Error adding mail to queue ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
