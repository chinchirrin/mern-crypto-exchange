import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { catchError, lastValueFrom } from 'rxjs';
import {
  BaseCurrencies,
  CryptoCurrencies,
} from 'src/common/constants/currencies';
import { Messages } from 'src/common/constants/messages';
import { CurrencyExchangeDto } from './dto/currency-exchange.dto';
import {
  CurrencyExchange,
  CurrencyExchangeDocument,
} from './model/currencyexchange.schema';

@Injectable()
export class CurrencyExchangeService {
  private readonly logger = new Logger(CurrencyExchangeService.name);

  constructor(
    @InjectModel(CurrencyExchange.name)
    private readonly currencyExchangeModel: Model<CurrencyExchangeDocument>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Returns the full list of crypto currency exchange records, both actual
   * exchanges and live prices pulled from an API
   */
  getHistorical(): Promise<CurrencyExchange[]> {
    return this.currencyExchangeModel.find().exec();
  }

  /**
   * Pull crypto currencies prices from a remote API and save them in our local
   * storage
   */
  async createRates(): Promise<object> {
    const cryptoPrices = await this.fetchCryptoPrices(BaseCurrencies);

    const saved = [];
    for (const price of cryptoPrices) {
      saved.push(await this.createLivePrice(price));
    }

    return {
      message: 'Latest crypto prices were added successfully.',
      data: saved,
    };
  }

  /**
   * Helper method for pulling all crypto prices for the full list of base
   * currencies
   */
  async fetchCryptoPrice(
    baseCurrencies: Array<string>,
  ): Promise<CurrencyExchangeDto[]> {
    const prices: Array<CurrencyExchangeDto> = [];

    // fetch crypto prices for valid base currencies
    for (const baseCurrency of baseCurrencies) {
      const currencyRates = await this.getCryptoPrices(baseCurrency);

      for (const key in currencyRates['rates']) {
        if (CryptoCurrencies.indexOf(key) < 0) {
          continue;
        }

        prices.push({
          currency_from: key,
          amount_from: 1,
          currency_to: currencyRates['base'],
          amount_to: 1 / currencyRates['rates'][key],
          type: 'Live Price',
        });
      }
    }

    return prices;
  }

  /**
   * Fetch the crypto prices for a given base currency from a remote API
   */
  async getCryptoPrices(baseCurrency: string): Promise<object> {
    const cryptoExchangeApiUrl = this.configService.get(
      'CRYPTO_EXCHANGE_API_URL',
    );
    const url = `${cryptoExchangeApiUrl}/${baseCurrency}`;
    const { data } = await lastValueFrom(
      this.httpService.get(url).pipe(
        catchError((error) => {
          this.logger.error(error);
          const errorMessage = Messages['pull_crypto_price_error'];
          throw errorMessage;
        }),
      ),
    );

    return data;
  }

  /**
   * Persist a record with the price of a unit of crypto currency in a base
   * currency
   */
  async createLivePrice(
    exchangeRate: CurrencyExchangeDto,
  ): Promise<CurrencyExchange> {
    const newRecord = new this.currencyExchangeModel(exchangeRate);

    return newRecord.save();
  }
}
