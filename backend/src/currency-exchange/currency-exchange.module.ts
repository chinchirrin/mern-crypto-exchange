import {HttpModule} from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencyExchangeService } from './currency-exchange.service';
import {
  CurrencyExchange,
  CurrencyExchangeSchema,
} from './model/currencyexchange.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CurrencyExchange.name,
        schema: CurrencyExchangeSchema,
      },
    ]),
    HttpModule,
  ],
  providers: [CurrencyExchangeService, CurrencyExchange],
  exports: [CurrencyExchangeService, CurrencyExchangeModule],
})
export class CurrencyExchangeModule {}
