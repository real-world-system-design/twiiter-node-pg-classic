import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateTweet {
  @IsNotEmpty()
  readonly text: string;

  @IsArray()
  readonly hashtags: string[];
}
