import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from '../../entities/posts.entity';
import { Comment } from '../../entities/comment.entity';
import { User } from '../../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tweet, Comment])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
