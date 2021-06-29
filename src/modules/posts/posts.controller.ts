import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Tweet } from '../../entities/posts.entity';
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
  getPostsByFeed(@Param('userid') userid: string): string {
    // TODO: user id we can get from jwt token
    return `all feeds of the following users of ${userid}`;
  }

  @Post('/')
  createPost(@Body('') articleData: string): string {
    // TODO: user id we can get from jwt token
    return `initiate a post request with ${articleData}`;
  }

  @Patch('/:postId')
  updatePostDetails(@Body('') articleData: string): string {
    // TODO: user id we can get from jwt token
    return `initiate a patch request with ${articleData}`;
  }

  @Delete('/:postId')
  deletePost(@Param('postId') postid: string) {
    // TODO: user id we can get from jwt token
    return `initiate a patch request for ${postid}`;
  }
}
