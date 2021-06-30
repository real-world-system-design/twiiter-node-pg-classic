import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export function createTypeOrmProdConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    username: 'twitter',
    password: 'twitter',
    database: 'twitter',
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    synchronize: true,
    logging: true,
    dropSchema: true,
    logger: 'advanced-console',
  };
}

export function createTypeOrmTestConfig(): TypeOrmModuleOptions {
  return {
    type: 'sqlite',
    database: ':memory:',
    entities: ['src/entities/*.ts'],
    synchronize: true,
    dropSchema: true,
    logging: true,
    logger: 'advanced-console',
  };
}

// url: `postgres://${process.env.POSTGRES_HOST}/${
//   process.env.POSTGRES_DB || 'twitter'
// }`
