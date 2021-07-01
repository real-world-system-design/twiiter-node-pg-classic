import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from '../../entities/posts.entity';
import { TweetData } from './dto/createTweet.dto';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { User } from '../../entities/user.entity';
import { sanitization } from '../../utils/security';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Tweet) private readonly tweetRepo: Repository<Tweet>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async getAllPosts(): Promise<Tweet[]> {
    return await this.tweetRepo.find();
  }
  async createTweet(data: TweetData, email: string): Promise<Tweet> {
    const { title, body, description, tagList } = data;

    const user = await this.userRepo.findOne({ email: email });
    if (!user)
      throw new HttpException(
        'User with this email not found',
        HttpStatus.UNAUTHORIZED,
      );

    const article = new Tweet();
    article.title = title;
    article.body = body;
    article.description = description;
    article.tagList = tagList;
    article.author = sanitization(user);

    const errors = await validate(article);
    if (errors.length > 0) {
      const _errors = { error: 'Input data validation failed' };
      throw new HttpException(_errors, HttpStatus.BAD_REQUEST);
    } else {
      const newArticle = await this.tweetRepo.save(article);
      return newArticle;
    }
  }
}
