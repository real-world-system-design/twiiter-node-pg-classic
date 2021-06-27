import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
export function createTypeOrmProdConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    url: `postgres://${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DB || "twitter"}`,
    entities: [join(__dirname, '**', '*.entity.{ts, js}')],
    synchronize: true,
    logging: true,
    dropSchema: true,
    logger: 'advanced-console',
  };
}
