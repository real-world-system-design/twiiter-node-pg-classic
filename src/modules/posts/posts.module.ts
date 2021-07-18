import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from '../../entities/posts.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { User } from '../../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet, User])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
