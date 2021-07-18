import { IsArray, IsNotEmpty } from 'class-validator';

export class TweetData {
  @IsNotEmpty()
  readonly text: string;

  @IsNotEmpty()
  @IsArray()
  readonly hashtags: string[];
}
