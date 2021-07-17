import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PasswordEntity } from '../../entities/password.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PasswordEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
