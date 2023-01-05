import { IsString, IsNumberString, IsOptional, IsDate } from 'class-validator';

export class CurrencyExchangeDto {
  @IsString() readonly currency_from: string;
  @IsNumberString() readonly amount_from: number;
  @IsString() readonly currency_to: string;
  @IsNumberString() readonly amount_to: number;
  @IsString() readonly type: string;
  @IsOptional() @IsDate() datetime: Date;
}
