import { Controller, Get, Header, Param } from '@nestjs/common';
import { Currency } from 'src/common/constants/currencies';
import { CryptoPricesService } from './crypto-prices.service';

@Controller('/api/v1/crypto-prices')
export class CryptoPricesController {
  constructor(private readonly cryptoPriceService: CryptoPricesService) {}

  @Get('/:base')
  @Header('Content-type', 'application/json')
  async prices(@Param('base') base: Currency) {
    return this.cryptoPriceService.getPrices(base);
  }
}
