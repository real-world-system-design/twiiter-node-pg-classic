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
  getPostsByFeed(@Param('userid') userid: string): string {
    // TODO: user id we can get from jwt token
    return `all feeds of the following users of ${userid}`;
  }

  @Get('/:twetid')
  async getPostById(@Param('tweetid') tweetid: string): Promise<Tweet> {
    return await this.postService.getPostById(tweetid);
  }

  @Post('/create')
  async createPost(
    @Body() data: TweetData,
    @User('email') email: string,
  ): Promise<Tweet> {
    // TODO: user id we can get from jwt token
    return await this.postService.createTweet(data, email);
  }

  @Patch('update/:tweetid')
  async updatePostDetails(
    @Param('tweetid') tweetid: string,
    @Body() updateRequest: UpdateTweet,
    @User('email') email: string,
  ): Promise<Tweet> {
    // TODO: user id we can get from jwt token
    return await this.postService.updateTweet(tweetid, email, updateRequest);
  }

  @Delete('/:postId')
  async deleteTweet(
    @Param('postId') postId: string,
    @User('email') email: string,
  ): Promise<void> {
    await this.postService.deleteTweet(postId, email);
  }
}
