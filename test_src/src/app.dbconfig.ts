import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleEntity } from './entities/article.entity';
import { UserEntity } from './entities/user.entity';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            username: 'devuser',
            password: 'devpasss',
            database: 'devdb',
            entities: [UserEntity, ArticleEntity],
            dropSchema: true,
            synchronize: true,
            logger: 'advanced-console',
            logging: true
        })
    ]
})
export class ProdDbModule {}

