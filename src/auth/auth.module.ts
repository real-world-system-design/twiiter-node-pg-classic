import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordEntity } from '../entities/password.entity';
import { SessionsEntity } from 'src/entities/session.entity';
import { UsersRepository } from '../user/user.repository';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([PasswordEntity, SessionsEntity, UsersRepository]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
