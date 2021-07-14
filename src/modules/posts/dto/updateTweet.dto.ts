import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateTweet {
  readonly title: string;

  readonly body: string;

  readonly description: string;

  @IsArray()
  readonly tagList: string[];
}
