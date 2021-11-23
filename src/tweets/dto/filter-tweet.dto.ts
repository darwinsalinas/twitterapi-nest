import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class FilterTweetDto {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  tweet_date: Date;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  user_id: number;

  @IsString()
  @MinLength(3)
  @IsOptional()
  tweet_text: string;
}
