import { Module } from '@nestjs/common';
import { CurrencyExchangeModule } from 'src/currency-exchange/currency-exchange.module';
import { CronService } from './cron.service';
import { CryptoPricesController } from './crypto-prices.controller';
import { CryptoPricesService } from './crypto-prices.service';

@Module({
  imports: [CurrencyExchangeModule],
  controllers: [CryptoPricesController],
  providers: [CryptoPricesService, CronService],
})
export class CryptoPricesModule {}
