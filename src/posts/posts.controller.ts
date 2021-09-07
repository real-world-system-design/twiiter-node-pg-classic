import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserPD } from '../auth/auth.decorator';
import { RequiredAuthGuard } from '../auth/auth.guard';
import { User } from '../entities/user.entity';
import { Tweet } from '../entities/posts.entity';
import { PostsService } from './posts.service';
import {
  ApiBearerAuth,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';

class PostCreateRequestBody {
  @ApiProperty() text: string;
  @ApiProperty() hashtags: string[];
  @ApiPropertyOptional() originalPostId: string;
  @ApiPropertyOptional() replyToPostId: string;
}

class UpdatePostRequestBody {
  @ApiProperty() text: string;
  @ApiProperty() hashtags: string[];
}

@ApiTags('posts')
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
  async getPostsByFeed(@Param('userid') userid: string): Promise<string> {
    // TODO: user id we can get from jwt token
    return `all feeds of the following users of ${userid}`;
  }

  @Get('/:twetid')
  @HttpCode(201)
  async getPostById(@Param('tweetid') tweetid: string): Promise<Tweet> {
    return await this.postService.getPostById(tweetid);
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Post('/create')
  @HttpCode(201)
  async createPost(
    @UserPD() author: User,
    @Body() post: PostCreateRequestBody,
  ): Promise<Tweet> {
    const createPost = await this.postService.createPost(post, author);
    return createPost;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Patch('/:postId')
  @HttpCode(201)
  async updatePost(
    @UserPD() author: User,
    @Param('postId') postId: string,
    @Body() data: UpdatePostRequestBody,
  ): Promise<Tweet> {
    const updatedPost = await this.postService.updateTweet(
      postId,
      author,
      data,
    );
    return updatedPost;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Delete('/:postId')
  @HttpCode(201)
  async deletePost(
    @Param('postId') postId: string,
    @UserPD() author: User,
  ): Promise<string> {
    await this.postService.deleteTweet(postId, author.id);
    return `post deleted for ${postId}`;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Put('/:postId/like')
  @HttpCode(201)
  async likePost(
    @Param('postId') postId: string,
    @UserPD() author: User,
  ): Promise<Tweet> {
    const likePost = await this.postService.likePost(postId, author.id);
    return likePost;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Delete('/:postId/like')
  @HttpCode(201)
  async dislikePost(
    @Param('postId') postId: string,
    @UserPD() author: User,
  ): Promise<Tweet> {
    const newPost = await this.postService.dislikePost(postId, author.id);
    return newPost;
  }
}
