import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { User } from '../../entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PasswordEntity } from '../../entities/password.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PasswordEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'user', method: RequestMethod.PATCH },
        { path: 'user', method: RequestMethod.DELETE },
      );
  }
}
