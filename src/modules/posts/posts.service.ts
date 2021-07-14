import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from '../../entities/posts.entity';
import { TweetData } from './dto/createTweet.dto';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { User } from '../../entities/user.entity';
import { sanitization } from '../../utils/security';
import { UpdateTweet } from './dto/updateTweet.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Tweet) private readonly tweetRepo: Repository<Tweet>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async getAllPosts(): Promise<Tweet[]> {
    return await this.tweetRepo.find();
  }

  async getPostById(tweetId: string): Promise<Tweet> {
    const post = await this.tweetRepo.findOne(tweetId);
    if (!post) throw new HttpException('tweet not found', HttpStatus.NOT_FOUND);
    return post;
  }

  async createTweet(data: TweetData, email: string): Promise<Tweet> {
    const { title, body, description, tagList } = data;

    const existingTitle = await this.tweetRepo.findOne({ title: title });
    if (existingTitle)
      throw new HttpException(
        'article with similar title existing',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

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
  public async updateTweet(
    tweetId: string,
    email: string,
    data: UpdateTweet,
  ): Promise<Tweet> {
    const toUpdate = await this.tweetRepo.findOne(tweetId);
    const user = await this.userRepo.findOne({ email: email });
    if (!user)
      throw new HttpException(
        'User with this email not found',
        HttpStatus.UNAUTHORIZED,
      );
    if (!toUpdate)
      throw new HttpException('tweet not found', HttpStatus.NOT_FOUND);

    console.log(data.body);

    if (data.body) toUpdate.body = data.body;
    if (data.title) toUpdate.title = data.title;
    if (data.description) toUpdate.description = data.description;
    if (data.tagList) toUpdate.tagList = data.tagList;

    return await this.tweetRepo.save(toUpdate);
  }
}
