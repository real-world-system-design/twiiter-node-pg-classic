import { getCustomRepositoryToken } from "@nestjs/typeorm";
import { ArticleEntity } from "../../entities/article.entity";
import { UserRepository } from "../../users/user.repository";
import { MockArticleRepository } from "./article.repository";
import { MockUserRepository } from "./user.repository.mock";

export const MockUserRepositoryProvider = {
    provide: getCustomRepositoryToken(UserRepository),
    useClass: MockUserRepository, 
};

export const MockArticleRepositoryProvider = {
    provide: getCustomRepositoryToken(ArticleEntity),
    useClass: MockArticleRepository,
}