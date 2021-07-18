import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import compression from 'fastify-compress';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.register(compression, { encodings: ['gzip'] });
  const config = new DocumentBuilder()
    .setTitle('chatter api')
    .setDescription('keep the world connected')
    .setVersion('1.0.0')
    .addTag('info sharing')
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  const PORT = process.env.PORT || 3000;
  SwaggerModule.setup('api', app, doc);
  await app.listen(PORT);
}
bootstrap();
