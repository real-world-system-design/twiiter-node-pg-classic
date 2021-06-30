import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTypeOrmTestConfig } from '../../app.dbconfig';
import { User } from '../../entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(createTypeOrmTestConfig()),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UserService],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it('should give a user array', () => {
    expect(service).toBeDefined();
  });
});
