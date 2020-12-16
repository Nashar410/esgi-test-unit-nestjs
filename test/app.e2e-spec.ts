import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/user (POST) is not valid', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        birthDate: new Date(2020,11,30),
        email: "toto@toto.fr",
        firstname: "toto",
        id: "2",
        isValid: true,
        lastname: "tata",
        password: "regsgdsgrdsg",
        todolist: undefined
      }).set('Content-type', 'application/json')
      .expect(400);
  });
});
