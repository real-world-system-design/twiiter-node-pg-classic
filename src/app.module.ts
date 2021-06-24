import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PostsModule } from './modules/posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTypeOrmProdConfig } from './app.dbconfig';
import { HashtagsModule } from './modules/hashtags/hashtags.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(createTypeOrmProdConfig()),
    UserModule,
    PostsModule,
    HashtagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
