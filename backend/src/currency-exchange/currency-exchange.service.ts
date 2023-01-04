import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrencyExchangeService {
  getHistorical(): string {
    return 'Will return currency exchange historical..';
  }
}
