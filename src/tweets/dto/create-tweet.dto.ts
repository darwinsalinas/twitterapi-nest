import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTweetDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  tweet_text: string;
}
