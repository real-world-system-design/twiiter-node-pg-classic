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
import { User } from '../user/user.decorator';
import { TweetData } from './dto/createTweet.dto';
import { UpdateTweet } from './dto/updateTweet.dto';
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

  @Post('/create')
  @HttpCode(201)
  async createPost(
    @Body() data: TweetData,
    @User('email') email: string,
  ): Promise<Tweet> {
    // TODO: user id we can get from jwt token
    return await this.postService.createTweet(data, email);
  }

  @Patch('update/:tweetid')
  @HttpCode(201)
  async updatePostDetails(
    @Param('tweetid') tweetid: string,
    @Body() updateRequest: UpdateTweet,
    @User('email') email: string,
  ): Promise<Tweet> {
    // TODO: user id we can get from jwt token
    return await this.postService.updateTweet(tweetid, email, updateRequest);
  }

  @Delete('/:postId')
  @HttpCode(201)
  async deleteTweet(
    @Param('postId') postId: string,
    @User('email') email: string,
  ): Promise<void> {
    await this.postService.deleteTweet(postId, email);
  }
}
