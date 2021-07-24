import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PasswordEntity } from '../entities/password.entity';
import { UsersRepository } from './user.repository';
import { UserFollowingEntity } from '../entities/user.following.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersRepository,
      PasswordEntity,
      UserFollowingEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
