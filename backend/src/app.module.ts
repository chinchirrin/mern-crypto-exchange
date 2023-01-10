import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { CurrencyExchangeModule } from './currency-exchange/currency-exchange.module';
import { CryptoPricesModule } from './crypto-prices/crypto-prices.module';
import { ScheduleModule } from '@nestjs/schedule';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://cryptoexchangedb:27017/cryptoexchangedb'),
    ScheduleModule.forRoot(),
    CurrencyExchangeModule,
    CryptoPricesModule,
    GatewayModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
