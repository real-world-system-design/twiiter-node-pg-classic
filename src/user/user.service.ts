import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { validate } from 'class-validator';
import { AuthService } from '../auth/auth.service';
import { UsersRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFollowingEntity } from '../entities/user.following.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UsersRepository,
    private authService: AuthService,
    @InjectRepository(UserFollowingEntity)
    private userFollowingRepo: Repository<UserFollowingEntity>,
  ) {}
  async getUserById(userId: string): Promise<User> {
    return await this.userRepo.findOne({ where: { id: userId } });
  }

  async registerUser(user: Partial<User>, password: string): Promise<User> {
    const existingEmail = await this.userRepo.findOne({ email: user.email });
    const existingUser = await this.userRepo.findOne({
      username: user.username,
    });
    if (existingEmail && existingUser)
      throw new HttpException(
        {
          message: `Input data validation failed ${user.username} and ${user.email} must be unique`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const errors = await validate(user);
    if (errors.length > 0) {
      const _errors = { username: 'UserInput is not valid' };
      throw new HttpException(
        { message: `Input data validation failed`, _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const newUser = await this.userRepo.save(user);

      await this.authService.createPasswordForNewUser(newUser.id, password);

      return newUser;
    }
  }

  async updateUser(
    userId: string,
    newUserDetails: Partial<User>,
  ): Promise<User> {
    const existingUser = await this.userRepo.findOne({ id: userId });
    if (!existingUser)
      throw new HttpException(
        `${userId} must be unique`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    if (newUserDetails.username)
      existingUser.username = newUserDetails.username;
    if (newUserDetails.bio) existingUser.bio = newUserDetails.bio;
    if (newUserDetails.avatar) existingUser.avatar = newUserDetails.avatar;
    return await this.userRepo.save(existingUser);
  }

  async createUserFollowerRelation(follower: User, followeeId: string) {
    const followee = await this.getUserById(followeeId);
    if (!followee) throw new NotFoundException('user not found');
    const newFollow = await this.userFollowingRepo.save({
      follower,
      followee,
    });
    return newFollow.followee;
  }

  async deleteFollowRelation(follower: User, followeeId: string) {
    const followee = await this.getUserById(followeeId);
    if (!followee) throw new NotFoundException('user not found');
    const follow = await this.userFollowingRepo.findOne({
      where: { follower, followee },
    });
    if (follow) {
      await this.userFollowingRepo.delete(follow.id);
      //TODO: show user does not follow them anymore
      return followee;
    } else {
      throw new NotFoundException('No follow relationship found');
    }
  }
}
