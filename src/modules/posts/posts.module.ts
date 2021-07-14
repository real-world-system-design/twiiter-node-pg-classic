import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { Tweet } from '../../entities/posts.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { User } from '../../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet, User])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'posts', method: RequestMethod.POST },
        { path: 'posts', method: RequestMethod.PATCH },
        { path: 'posts', method: RequestMethod.DELETE },
      );
  }
}
