import { Module } from "@nestjs/common";
import { MockArticleRepositoryProvider, MockUserRepositoryProvider } from "../commons/mocks/mock.provider";

@Module({
    providers: [
        MockArticleRepositoryProvider,
        MockUserRepositoryProvider,
    ],
    exports: [
        MockArticleRepositoryProvider,
        MockUserRepositoryProvider,
    ],
})
export class MockArticleModule {}