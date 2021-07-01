import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: true })
  password?: string;

  token: string;
}
