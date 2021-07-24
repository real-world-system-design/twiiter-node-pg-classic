import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('sessions')
export class SessionsEntity extends BaseEntity {
  @Column()
  userId: string;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User, {
    lazy: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: Promise<User>;
}
