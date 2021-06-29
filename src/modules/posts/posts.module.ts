import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from '../../entities/posts.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
