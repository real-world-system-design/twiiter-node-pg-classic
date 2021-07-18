import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { Tweet } from '../entities/posts.entity';
import { CommentService } from './comment.service';
import { createCommentDto } from './dto/createComment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':tweetId/comment')
  @HttpCode(201)
  async create(
    @Param('tweetId') tweetId: string,
    @Body() data: createCommentDto,
    email: string,
  ): Promise<Tweet> {
    return await this.commentService.addComment(tweetId, email, data);
  }
}
