import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export function createTypeOrmProdConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    url:
      process.env.DATABASE_URL ||
      'postgres://twitter:twitter@localhost:5432/twitter',
    ssl: process.env.NODE_ENV === 'production' ? true : false,
    extra:
      process.env.NODE_ENV === 'production'
        ? {
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : null,
    dropSchema: process.env.NODE_ENV === 'production' ? false : true,
    synchronize: true,
    logging: process.env.NODE_ENV === 'production' ? false : true,
    logger: process.env.NODE_ENV === 'production' ? null : 'advanced-console',
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
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
