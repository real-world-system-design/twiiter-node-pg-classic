import { Body, Controller, Param, Post } from '@nestjs/common';
import { Tweet } from '../../entities/posts.entity';
import { User } from '../user/user.decorator';
import { CommentService } from './comment.service';
import { createCommentDto } from './dto/createComment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':tweetId/comment')
  async create(
    @Param('tweetId') tweetId: string,
    @User('email') email: string,
    @Body() data: createCommentDto,
  ): Promise<Tweet> {
    return await this.commentService.addComment(tweetId, email, data);
  }
}
