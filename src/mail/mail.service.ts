import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(data: {
    totalSales: number;
    skuSales: { sku: string; value: number }[];
  }) {
    await this.mailerService.sendMail({
      from: 'testing@gmail.com',
      to: 'testing@gmail.com',
      subject: 'Sales Report',
      text: this.formatSalesReport(data),
    });
  }

  // Helper function to format sales report into a readable format
  private formatSalesReport(salesReport: {
    totalSales: number;
    skuSales: { sku: string; value: number }[];
  }): string {
    let formattedReport = `Total Sales: $${salesReport.totalSales}\n\nItem Sales Summary:\n`;

    salesReport.skuSales.forEach((item) => {
      formattedReport += `SKU: ${item.sku}, Quantity Sold: ${item.value}\n`;
    });

    return formattedReport;
  }
}
