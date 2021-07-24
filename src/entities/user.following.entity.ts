import { Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Unique('following_pair', ['follower', 'followee'])
@Entity('user_followings')
export class UserFollowingEntity extends BaseEntity {
  @JoinColumn({ name: 'follower_id' })
  @ManyToOne(() => User)
  follower: User;

  @JoinColumn({ name: 'followee_id' })
  @ManyToOne(() => User)
  followee: User;
}
