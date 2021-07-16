import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from '../../entities/posts.entity';
import { Repository } from 'typeorm';
import { Comment } from '../../entities/comment.entity';
import { createCommentDto } from './dto/createComment.dto';
import { User } from '../../entities/user.entity';
import { sanitization } from '../../utils/security';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRO: Repository<Comment>,
    @InjectRepository(Tweet)
    private readonly tweetRO: Repository<Tweet>,
    @InjectRepository(User)
    private readonly UserRO: Repository<User>,
  ) {}
  async addComment(
    tweetId: string,
    email: string,
    data: createCommentDto,
  ): Promise<Tweet> {
    const user = await this.UserRO.findOne({ email: email });
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    let tweet = await this.tweetRO.findOne(tweetId);
    if (!tweet)
      throw new HttpException('tweet not found', HttpStatus.NOT_FOUND);

    const comment = new Comment();
    comment.body = data.body;
    comment.author = sanitization(user);

    tweet.comments.push(comment);

    await this.commentRO.save(comment);
    tweet = await this.tweetRO.save(tweet);
    return tweet;
  }
}
