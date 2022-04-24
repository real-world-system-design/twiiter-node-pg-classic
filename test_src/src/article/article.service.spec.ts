import { Test, TestingModule } from '@nestjs/testing';
import { MockArticleRepositoryProvider } from '../commons/mocks/mock.provider';
import { MockArticleModule } from './article.module.mock';
import { ArticleRepository } from './article.repository';
import { ArticleService } from './article.service';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockArticleModule],
      providers: [ArticleService, ArticleRepository],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
