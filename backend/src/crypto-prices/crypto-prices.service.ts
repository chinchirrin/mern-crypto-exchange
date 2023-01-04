/**
 * Helper service for generating crypto exchange rates given a valid
 * base currency (USD, EUR, GBP)
 *
 * It uses a base value of a given cryto currency and generates a new value
 * in the range of ±10%
 */
import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseCurrencies, Currency } from 'src/common/constants/currencies';

// helper array for computing crypto exchange rates
const baseExchangeRates = {
  USD: {
    BTC: 1 / 16000,
    ETH: 1 / 1200,
  },
  EUR: {
    BTC: 1 / 15000,
    ETH: 1 / 1130,
  },
  GBP: {
    BTC: 1 / 13000,
    ETH: 1 / 1000,
  },
};

@Injectable()
/**
 * @throws {BadRequestException}  When base currency is invalid
 */
export class CryptoPricesService {
  /**
   * Simulate getting crypto currency exchange rates
   */
  getPrices(base: Currency): string {
    base = base.toUpperCase() as Currency;

    // @todo: move to a validation pipe
    const keys = BaseCurrencies.slice();
    if (keys.indexOf(base) < 0) {
      throw new BadRequestException('Invalid currency');
    }

    const response = {
      base: base,
      rates: {
        BTC: computeExchangeRate('USD', 'BTC'),
        ETH: computeExchangeRate('USD', 'ETH'),
      },
    };

    return JSON.stringify(response);
  }
}

/**
 * Applies the random factor produced by `generateRandomFactor()` to the base
 * value of the crypto currency, effectively generating a new exchange rate
 */
function computeExchangeRate(
  baseCurrency: string,
  targetCurrency: string,
): number {
  const baseExchange = baseExchangeRates[baseCurrency][targetCurrency];

  return generateRandomFactor() * baseExchange;
}

/**
 * Generates a random value between the defined min and max (-10, 10)
 */
function generateRandomFactor(): number {
  const min = -10;
  const max = 10;

  // generate random number in range (min, max)
  const rand = Math.random() * (max - min) + min;
  // make it a percentage factor
  const factor = rand / 100 + 1;

  return factor;
}
