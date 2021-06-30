import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from '../../entities/posts.entity';
import { TweetData } from './dto/createTweet.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Tweet) private readonly tweetRepo: Repository<Tweet>,
  ) {}
  async getAllPosts(): Promise<Tweet[]> {
    return await this.tweetRepo.find();
  }
  async createTweet(data: TweetData): Promise<Tweet> {
    const { title, body, description, tagList } = data;

    const article = new Tweet();
    article.title = title;
    article.body = body;
    article.description = description;
    article.tagList = tagList;

    const newArticle = await this.tweetRepo.save(article);
    return newArticle;
  }
}
