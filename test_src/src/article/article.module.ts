import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './article.controller';
import { ArticleRepository } from './article.repository';
import { ArticleService } from './article.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    ArticleRepository
  ])],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
