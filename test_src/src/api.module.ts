import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { ArticleModule } from './article/article.module';

@Module({
    imports: [UsersModule, ArticleModule],
})
export class ApiModule {}