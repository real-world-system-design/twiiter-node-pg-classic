import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('passwords')
export class PasswordEntity extends BaseEntity {
  @Column()
  userId: string;

  @JoinColumn({ name: 'userId' })
  @OneToOne(() => User)
  user: User;

  @Column({ nullable: false })
  password: string;
}
