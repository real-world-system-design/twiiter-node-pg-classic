import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Tweet } from '../entities/posts.entity';
import { Comment } from '../entities/comment.entity';
import { UsersRepository } from '../user/user.repository';
import { PostsRepository } from '../posts/posts.repository';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(
    private commentRO: CommentRepository,
    private tweetRO: PostsRepository,
    private userRepo: UsersRepository,
  ) {}
  async addComment(
    tweetId: string,
    userId: string,
    data: Partial<Comment>,
  ): Promise<Tweet> {
    const user = await this.userRepo.findOne(userId);
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    let tweet = await this.tweetRO.findOne(tweetId);
    if (!tweet)
      throw new HttpException('tweet not found', HttpStatus.NOT_FOUND);

    const comment = new Comment();
    comment.body = data.body;
    // comment.author = user;

    tweet.comments.push(comment);

    await this.commentRO.save(comment);
    tweet = await this.tweetRO.save(tweet);
    return tweet;
  }
}
