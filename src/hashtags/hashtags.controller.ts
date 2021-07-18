import { Get, HttpCode, Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';

@Controller('hashtags')
export class HashtagsController {
  @Get('/')
  @HttpCode(201)
  getHashtags(): string {
    return 'all top hashtags';
  }

  @Get('/:tag/posts')
  @HttpCode(201)
  getPostsForTags(@Param('tag') tag: string): string {
    return `all posts in an array for ${tag}`;
  }
}
