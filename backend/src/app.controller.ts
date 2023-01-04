import { Controller, Get } from '@nestjs/common';
import { CurrencyExchangeService } from './currency-exchange/currency-exchange.service';

@Controller('/api/v1/currency-exchange')
export class AppController {
  constructor(
    private readonly currencyExchangeService: CurrencyExchangeService
  ) {}

  @Get('historical')
  getHistorical(): string {
    return this.currencyExchangeService.getHistorical();
  }
}
