import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Tweet } from './entities/posts.entity';
import { User } from './entities/user.entity';
// import { join } from 'path';

export function createTypeOrmProdConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    username: 'twitter',
    password: 'twitter',
    database: 'twitter',
    entities: [User, Tweet],
    synchronize: true,
    logging: true,
    dropSchema: true,
    logger: 'advanced-console',
  };
}

// url: `postgres://${process.env.POSTGRES_HOST}/${
//   process.env.POSTGRES_DB || 'twitter'
// }`
