import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Tweet } from './posts.entity';
import { User } from './user.entity';

@Entity('comments')
export class Comment extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  body?: string;

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => Tweet, (tweet) => tweet.comments)
  tweet: Tweet;
}
