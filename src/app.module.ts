import { Module } from '@nestjs/common';
import { InvoiceModule } from './invoice/invoice.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables from .env file
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Ensure ConfigModule is imported for dynamic DB connection
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGODB_URI') || process.env.MONGODB_URI, // MongoDB URI from environment variables
      }),
      inject: [ConfigService], // Inject ConfigService to access the .env variables
    }),
    InvoiceModule, // Import InvoiceModule
  ],
})
export class AppModule {}
