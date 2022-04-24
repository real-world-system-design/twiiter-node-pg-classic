import { Injectable } from '@nestjs/common';
import { ArticleEntity } from 'src/entities/article.entity';
import { ArticleRepository } from './article.repository';

@Injectable()
export class ArticleService {
    constructor(private articleRepo: ArticleRepository) {}

    async getAllArticles(): Promise<ArticleEntity[]> {
        const foundArticles = await this.articleRepo.find();
        return foundArticles;
    }
}
