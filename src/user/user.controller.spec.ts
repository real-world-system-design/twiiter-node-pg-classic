import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import {
  MockPasswordRepositoryProvider,
  MockSessionRepositoryProvider,
  MockUsersRepositoryProvider,
} from '../commons/mocks/mock.provider';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UsersController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        AuthService,
        MockUsersRepositoryProvider,
        MockPasswordRepositoryProvider,
        MockSessionRepositoryProvider,
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
