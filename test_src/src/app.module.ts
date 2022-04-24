import { Module } from '@nestjs/common';
import { ApiModule } from './api.module';
import { AppController } from './app.controller';
import { ProdDbModule } from './app.dbconfig';
import { AppService } from './app.service';

@Module({
  imports: [ProdDbModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
