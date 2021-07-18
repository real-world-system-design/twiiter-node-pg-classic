import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HashtagsModule } from './hashtags/hashtags.module';
import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, PostsModule, HashtagsModule, AuthModule],
})
export class ApiModule {}
