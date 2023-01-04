import { Controller, Get, Header } from '@nestjs/common';
import { CurrencyExchangeService } from './currency-exchange/currency-exchange.service';
import { CurrencyExchange } from './currency-exchange/model/currencyexchange.schema';

@Controller('/api/v1/currency-exchange')
export class AppController {
  constructor(
    private readonly currencyExchangeService: CurrencyExchangeService
  ) {}

  @Get('historical')
  @Header('Content-type', 'application/json')
  @Header('Cache-Control', 'none')
  getHistorical(): Promise<CurrencyExchange[]> {
    return this.currencyExchangeService.getHistorical();
  }
}
