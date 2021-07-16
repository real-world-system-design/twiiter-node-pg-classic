import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from '../../entities/posts.entity';
import { Comment } from '../../entities/comment.entity';
import { User } from '../../entities/user.entity';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tweet, Comment])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'comment', method: RequestMethod.ALL });
  }
}
