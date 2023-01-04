import { Module } from '@nestjs/common';
import { CryptoPricesController } from './crypto-prices.controller';
import { CryptoPricesService } from './crypto-prices.service';

@Module({
  controllers: [CryptoPricesController],
  providers: [CryptoPricesService],
})
export class CryptoPricesModule {}
