import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CurrencyExchangeDocument = HydratedDocument<CurrencyExchange>;

@Schema()
export class CurrencyExchange {
  @Prop({ required: true, default: Date.now() })
  datetime: Date;

  @Prop({ required: true, uppercase: true, trim: true })
  currency_from: string;

  @Prop({ required: true })
  amount_from: number;

  @Prop({ required: true, uppercase: true, trim: true })
  currency_to: string;

  @Prop({ required: true })
  amount_to: number;

  @Prop({ required: true })
  type: string;
}

export const CurrencyExchangeSchema =
  SchemaFactory.createForClass(CurrencyExchange);
