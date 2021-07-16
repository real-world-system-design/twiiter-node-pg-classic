import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);
}
bootstrap();
