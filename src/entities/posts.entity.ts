import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('tweets')
export abstract class Tweet extends BaseEntity {
  @Column({ length: 50, nullable: false })
  title: string;

  @Column({ length: 100, nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: false })
  body: string;

  @Column({ type: 'text', nullable: true })
  tagList?: string[];

  @Column({ default: 0 })
  favoritesCount?: number;

  @ManyToOne(() => User)
  author: User;
}
