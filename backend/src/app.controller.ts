import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { CurrencyExchangeService } from './currency-exchange/currency-exchange.service';
import { CurrencyExchangeDto } from './currency-exchange/dto/currency-exchange.dto';
import { CurrencyExchange } from './currency-exchange/model/currencyexchange.schema';

@Controller('/api/v1/currency-exchange')
export class AppController {
  constructor(
    private readonly currencyExchangeService: CurrencyExchangeService,
  ) {}

  @Get('historical')
  @Header('Content-type', 'application/json')
  @Header('Cache-Control', 'none')
  getHistorical(): Promise<CurrencyExchange[]> {
    return this.currencyExchangeService.getHistorical();
  }

  @Post('exchange')
  async createExchange(@Body() currencyExchangeDto: CurrencyExchangeDto) {
    return this.currencyExchangeService.createCurrencyExchange(
      currencyExchangeDto,
    );
  }
}
