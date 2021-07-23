import { Test, TestingModule } from '@nestjs/testing';
import { ApiModule } from 'src/api.module';
import { TestDbModule } from 'src/app.dbconfig';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiModule, TestDbModule],
    }).compile();

    app = moduleFixture.createNestApplication(new FastifyAdapter());
    await app.init();
  });

  //test user creation
  it('(POST) /users/', () => {
    return app
      .inject({
        method: 'POST',
        url: '/user/register',
        payload: {
          email: 'devops@gmail.com',
          username: 'devops world',
          password: '1234',
        },
      })

      .then((response) => {
        expect(response.statusCode).toBe(201);
      });
  });
  afterAll(async () => {
    await app.close();
  });
});
