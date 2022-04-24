import { ArticleEntity } from "../entities/article.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ArticleEntity)
export class ArticleRepository extends Repository<ArticleEntity> {}