require('dotenv').config()
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/user.entity';
import { PasswordEntity } from './entities/password.entity';
import { Tweet } from './entities/posts.entity';
import { Comment } from './entities/comment.entity';
import { SessionsEntity } from './entities/session.entity';
import { UserFollowingEntity } from './entities/user.following.entity';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env.dev',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      dropSchema: false,
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
    ConfigModule.forRoot({
      envFilePath:  '.env.test',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
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
