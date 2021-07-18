import { Module } from '@nestjs/common';
import { RequiredAuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import {
  MockUsersRepositoryProvider,
  MockPostsRepositoryProvider,
  MockPasswordRepositoryProvider,
  MockSessionRepositoryProvider,
} from '../commons/mocks/mock.provider';

@Module({
  providers: [
    MockUsersRepositoryProvider,
    MockPostsRepositoryProvider,
    MockPasswordRepositoryProvider,
    MockSessionRepositoryProvider,
    RequiredAuthGuard,
    AuthService,
  ],
  exports: [
    MockUsersRepositoryProvider,
    MockPostsRepositoryProvider,
    MockPasswordRepositoryProvider,
    MockSessionRepositoryProvider,
    RequiredAuthGuard,
    AuthService,
  ],
})
export class MockPostsModule {}
