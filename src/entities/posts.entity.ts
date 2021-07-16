import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Comment } from './comment.entity';
import { User } from './user.entity';

@Entity('tweets')
export class Tweet extends BaseEntity {
  @Column({ length: 240, nullable: true })
  text: string;

  @Column('json', { default: [] })
  images?: Array<string>;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column('json', { default: [], nullable: true })
  hashtags?: string[];

  @Column({ name: 'like_count', default: 0 })
  likesCount: number;

  @OneToMany(() => Comment, (comment) => comment.tweet, { eager: true })
  @JoinColumn()
  comments: Array<Comment>;
}
