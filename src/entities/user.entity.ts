import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ length: 30, nullable: false, unique: true })
  email: string;

  @Column({ length: 50 })
  username?: string;
  avatar?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ length: 240, nullable: true })
  bio: string;

  @Column('boolean', { default: false })
  verified: boolean;

  token: string;
}
