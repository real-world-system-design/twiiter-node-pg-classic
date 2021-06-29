import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from 'src/entities/posts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Tweet) private readonly postRepo: Repository<Tweet>,
  ) {}
  async getAllPosts(): Promise<Tweet[]> {
    return await this.postRepo.find();
  }
}
