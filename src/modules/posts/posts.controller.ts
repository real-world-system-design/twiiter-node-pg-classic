import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('posts')
export class PostsController {
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
