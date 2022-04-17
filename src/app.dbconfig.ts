require('dotenv').config()
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config'
import { PasswordEntity } from './entities/password.entity';
import { Tweet } from './entities/posts.entity';
import { Comment } from './entities/comment.entity';
import { SessionsEntity } from './entities/session.entity';
import { UserFollowingEntity } from './entities/user.following.entity';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      username: 'twitter' || process.env.POSTGRES_USER,
      password: 'twitter' || process.env.POSTGRES_PASSWORD,
      database: 'twitter' || process.env.POSTGRES_DB,
      synchronize: true,
      dropSchema: true,
      logger: 'advanced-console',
      logging: 'all',
      entities: [
        User,
        Tweet,
        Comment,
        SessionsEntity,
        UserFollowingEntity,
        PasswordEntity,
      ],
    }),
  ],
})
export class ProdDbModule {}

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      database: 'test',
      username: 'test',
      password: 'test',
      dropSchema: true,
      synchronize: true,
      logging: 'all',
      logger: 'advanced-console',
      entities: [
        User,
        Tweet,
        Comment,
        SessionsEntity,
        UserFollowingEntity,
        PasswordEntity,
      ],
    }),
  ],
})
export class TestDbModule {}
