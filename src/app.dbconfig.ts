import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PasswordEntity } from './entities/password.entity';
import { Tweet } from './entities/posts.entity';
import { Comment } from './entities/comment.entity';
import { SessionsEntity } from './entities/session.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'twitter',
      password: 'twitter',
      database: 'twitter',
      synchronize: true,
      dropSchema: true,
      logger: 'advanced-console',
      logging: 'all',
      entities: [User, Tweet, Comment, SessionsEntity, PasswordEntity],
    }),
  ],
})
export class ProdDbModule {}

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'test',
      username: 'test',
      password: 'test',
      dropSchema: true,
      synchronize: true,
      logging: 'all',
      logger: 'advanced-console',
      entities: [User, Tweet, Comment, SessionsEntity, PasswordEntity],
    }),
  ],
})
export class TestDbModule {}
