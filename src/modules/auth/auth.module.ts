import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordEntity } from '../../entities/password.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([PasswordEntity])],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
