import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { UsersRepository } from '../user/user.repository';
import { PostsRepository } from './posts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostsRepository, UsersRepository])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
