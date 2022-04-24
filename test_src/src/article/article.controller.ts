import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from 'src/entities/article.entity';
import { ArticleService } from './article.service';

@ApiTags('article')
@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get()
    @HttpCode(200)
    async getAllArticles(): Promise<ArticleEntity[]> {
        return await this.articleService.getAllArticles();
    }
}
