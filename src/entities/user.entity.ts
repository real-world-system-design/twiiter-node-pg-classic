import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PasswordEntity } from './password.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ length: 30, nullable: false, unique: true })
  email: string;

  @Column({ length: 50 })
  username?: string;
  avatar?: string;

  @Column({ length: 240, nullable: true })
  bio: string;

  @Column('boolean', { default: false })
  verified: boolean;

  @OneToOne((type) => PasswordEntity, (password) => password.user, {
    lazy: true,
    cascade: true,
  })
  token: string;
}
