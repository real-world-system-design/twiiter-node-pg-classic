import { getCustomRepositoryToken, getRepositoryToken } from '@nestjs/typeorm';
import { UserFollowingEntity } from '../../entities/user.following.entity';
import { PasswordEntity } from '../../entities/password.entity';
import { SessionsEntity } from '../../entities/session.entity';
import { PostsRepository } from '../../posts/posts.repository';
import { UsersRepository } from '../../user/user.repository';
import { MockPostsRepository } from './posts.repository.mock';
import { MockUsersRepository } from './users.repository.mock';

export const MockUsersRepositoryProvider = {
  provide: getCustomRepositoryToken(UsersRepository),
  useClass: MockUsersRepository,
};

export const MockPostsRepositoryProvider = {
  provide: getCustomRepositoryToken(PostsRepository),
  useClass: MockPostsRepository,
};

export const MockPasswordRepositoryProvider = {
  provide: getRepositoryToken(PasswordEntity),
  useValue: {},
};

export const MockFollowingRepositoryProvider = {
  provide: getRepositoryToken(UserFollowingEntity),
  useValue: {},
};

export const MockSessionRepositoryProvider = {
  provide: getRepositoryToken(SessionsEntity),
  useValue: {},
};
