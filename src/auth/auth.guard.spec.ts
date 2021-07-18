import { TestingModule, Test } from '@nestjs/testing';
import {
  MockUsersRepositoryProvider,
  MockPasswordRepositoryProvider,
  MockSessionRepositoryProvider,
} from '../commons/mocks/mock.provider';
import { OptionalAuthGuard, RequiredAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('OptionalAuthGuard', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        MockUsersRepositoryProvider,
        MockPasswordRepositoryProvider,
        MockSessionRepositoryProvider,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(new OptionalAuthGuard(authService)).toBeDefined();
  });
});

describe('RequiredAuthGuard', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        MockUsersRepositoryProvider,
        MockPasswordRepositoryProvider,
        MockSessionRepositoryProvider,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });
  it('should be defined', () => {
    expect(new RequiredAuthGuard(authService)).toBeDefined();
  });
});
