import { Get, Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';

@Controller('hashtags')
export class HashtagsController {
  @Get('/')
  getHashtags(): string {
    return 'all top hashtags';
  }

  @Get('/:tag/posts')
  getPostsForTags(@Param('tag') tag: string): string {
    return `all posts in an array for ${tag}`;
  }
}
