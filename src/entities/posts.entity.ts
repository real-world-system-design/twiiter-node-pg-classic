import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Comment } from './comment.entity';
import { User } from './user.entity';

@Entity('tweets')
export class Tweet extends BaseEntity {
  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  body: string;

  @Column('json', { default: [], nullable: true })
  tagList: Array<string>;

  @Column({ default: 0 })
  favoritesCount: number;

  @ManyToOne(() => User)
  author: User;

  @OneToMany(() => Comment, (comment) => comment.tweet, { eager: true })
  @JoinColumn()
  comments: Array<Comment>;
}
