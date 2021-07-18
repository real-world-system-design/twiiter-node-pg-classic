import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Tweet } from '../entities/posts.entity';
import { TweetData } from './dto/createTweet.dto';
import { validate } from 'class-validator';
import { UpdateTweet } from './dto/updateTweet.dto';
import { PostsRepository } from './posts.repository';
import { UsersRepository } from '../user/user.repository';

@Injectable()
export class PostsService {
  constructor(
    private postsRepo: PostsRepository,
    private userRepo: UsersRepository,
  ) {}
  async getAllPosts(): Promise<Tweet[]> {
    return await this.postsRepo.find();
  }

  async getPostById(tweetId: string): Promise<Tweet> {
    const post = await this.postsRepo.findOne(tweetId);
    if (!post) throw new HttpException('tweet not found', HttpStatus.NOT_FOUND);
    return post;
  }

  async createTweet(data: TweetData, email: string): Promise<Tweet> {
    const { text, hashtags } = data;

    const existingText = await this.postsRepo.findOne({ text: text });
    if (existingText)
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
    article.text = text;
    article.hashtags = hashtags;
    article.author = user;

    const errors = await validate(article);
    if (errors.length > 0) {
      const _errors = { error: 'Input data validation failed' };
      throw new HttpException(_errors, HttpStatus.BAD_REQUEST);
    } else {
      const newArticle = await this.postsRepo.save(article);
      return newArticle;
    }
  }
  public async updateTweet(
    tweetId: string,
    email: string,
    data: UpdateTweet,
  ): Promise<Tweet> {
    const toUpdate = await this.postsRepo.findOne(tweetId);
    const user = await this.userRepo.findOne({ email: email });
    if (!user)
      throw new HttpException(
        'User with this email not found',
        HttpStatus.UNAUTHORIZED,
      );
    if (!toUpdate)
      throw new HttpException('tweet not found', HttpStatus.NOT_FOUND);

    if (data.text) toUpdate.text = data.text;
    if (data.hashtags) toUpdate.hashtags = data.hashtags;

    return await this.postsRepo.save(toUpdate);
  }

  public async deleteTweet(tweetId: string, userId: string): Promise<void> {
    const tweet = await this.postsRepo.findOne(tweetId);
    const user = await this.userRepo.findOne(userId);
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    if (!tweet)
      throw new HttpException('tweet not found', HttpStatus.NOT_FOUND);
    await this.postsRepo.remove(tweet);
  }
}
