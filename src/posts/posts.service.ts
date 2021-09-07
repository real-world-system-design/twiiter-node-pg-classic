import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Tweet } from '../entities/posts.entity';
import { UpdateTweet } from './dto/updateTweet.dto';
import { PostsRepository } from './posts.repository';
import { UsersRepository } from '../user/user.repository';
import { User } from 'src/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    private postsRepo: PostsRepository,
    private userRepo: UsersRepository,
  ) {}
  public async getAllPosts(): Promise<Tweet[]> {
    return await this.postsRepo.find();
  }

  public async getPostById(tweetId: string): Promise<Tweet> {
    const post = await this.postsRepo.findOne(tweetId);
    if (!post) throw new HttpException('tweet not found', HttpStatus.NOT_FOUND);
    return post;
  }

  public async createPost(post: Partial<Tweet>, author: User): Promise<Tweet> {
    if (!post.text) {
      throw new HttpException('post must contain text', HttpStatus.BAD_REQUEST);
    }

    const newPost = new Tweet();
    newPost.text = post.text;
    newPost.hashtags = post.hashtags;
    newPost.author = author;

    const savePost = await this.postsRepo.save(newPost);
    return savePost;
  }
  public async updateTweet(
    tweetId: string,
    userId: User,
    data: Partial<Tweet>,
  ): Promise<Tweet> {
    const toUpdate = await this.postsRepo.findOne(tweetId);
    console.log(toUpdate);
    console.log(userId);
    const user = await this.userRepo.findOne(userId.id);
    console.log(user);
    if (!user)
      throw new HttpException(
        'User with this id not found',
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
