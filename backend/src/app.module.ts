import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { CurrencyExchangeModule } from './currency-exchange/currency-exchange.module';
import { CryptoPricesModule } from './crypto-prices/crypto-prices.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    CurrencyExchangeModule,
    CryptoPricesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
