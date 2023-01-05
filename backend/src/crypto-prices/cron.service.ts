import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { CurrencyExchangeService } from 'src/currency-exchange/currency-exchange.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    private readonly cryptoLivePricesService: CurrencyExchangeService,
  ) {}

  /**
   * Fetch crypto live prices on an interval basis, time in millisecons
   */
  @Interval('livepricesupdates', 1000 * 60 * 5)
  scheduledLivePrices() {
    this.cryptoLivePricesService.createRates();
    this.logger.log('Crypto live prices were fetched and saved!');
  }
}
