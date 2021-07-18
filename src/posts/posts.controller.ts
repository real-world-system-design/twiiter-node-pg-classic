import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { Tweet } from '../entities/posts.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get('/')
  @HttpCode(201)
  async getAllArticles(): Promise<Tweet[]> {
    return await this.postService.getAllPosts();
  }
  @Get('/feed')
  @HttpCode(201)
  getPostsByFeed(@Param('userid') userid: string): string {
    // TODO: user id we can get from jwt token
    return `all feeds of the following users of ${userid}`;
  }

  @Get('/:twetid')
  @HttpCode(201)
  async getPostById(@Param('tweetid') tweetid: string): Promise<Tweet> {
    return await this.postService.getPostById(tweetid);
  }
}
