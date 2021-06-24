import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
export function createTypeOrmProdConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    database: 'twitter',
    username: 'twitter',
    password: 'twitter',
    entities: [join(__dirname, '**', '*.entity.{ts, js}')],
    synchronize: true,
    logging: true,
    dropSchema: true,
    logger: 'advanced-console',
  };
}
