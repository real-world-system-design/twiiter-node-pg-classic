import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTypeOrmTestConfig } from '../../app.dbconfig';
import { Tweet } from '../../entities/posts.entity';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(createTypeOrmTestConfig()),
        TypeOrmModule.forFeature([Tweet]),
      ],
      providers: [PostsService],
    }).compile();
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
