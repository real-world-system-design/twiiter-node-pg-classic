import { ArticleEntity } from "../../entities/article.entity";
import { Repository } from "typeorm";

export class MockArticleRepository extends Repository<ArticleEntity> {
    async findOne() {
        return new ArticleEntity();
    }
} 