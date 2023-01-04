import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CurrencyExchange,
  CurrencyExchangeDocument,
} from './model/currencyexchange.schema';

@Injectable()
export class CurrencyExchangeService {
  constructor(
    @InjectModel(CurrencyExchange.name)
    private readonly currencyExchangeModel: Model<CurrencyExchangeDocument>,
  ) {}

  getHistorical(): Promise<CurrencyExchange[]> {
    return this.currencyExchangeModel.find().exec();
  }
}
