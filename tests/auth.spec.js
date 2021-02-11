const request = require('supertest');

const app = require('../app');

const accountData = {
  email: `test${Date.now()}@test.com`,
  password: `test${Date.now()}`,
};

afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 500));
});

describe(
  'Test Auth APIs',
  () => {
    test(
      'It should not create a new account if data is missing',
      async () => {
        try {
          await request(app).post('/api/auth/register').send({ email: accountData.email });
        } catch (error) {
          const { body: { info = '', status = null } = {} } = error;
          expect(info).toBe('MISSING_DATA');
          expect(status).toBe(400);
        }
      },
    );

    test(
      'It should create a new account',
      async () => {
        const response = await request(app).post('/api/auth/register').send(accountData);
        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeTruthy();
      },
    );

    test(
      'It should not create a new account if email is already in use',
      async () => {
        try {
          await request(app).post('/api/auth/register').send(accountData);
        } catch (error) {
          const { body: { info = '', status = null } = {} } = error;
          expect(info).toBe('EMAIL_ALREADY_IN_USE');
          expect(status).toBe(400);
        }
      },
    );

    test(
      'It should not log into account if data is missing',
      async () => {
        try {
          await request(app).post('/api/auth/login').send({ email: accountData.email });
        } catch (error) {
          const { body: { info = '', status = null } = {} } = error;
          expect(info).toBe('MISSING_DATA');
          expect(status).toBe(400);
        }
      },
    );

    test(
      'It should not log into account if data is incorrect',
      async () => {
        try {
          await request(app).post('/api/auth/login').send({
            email: accountData.email,
            password: `incorrect-${accountData.password}`,
          });
        } catch (error) {
          const { body: { info = '', status = null } = {} } = error;
          expect(info).toBe('ACCESS_DENIED');
          expect(status).toBe(401);
        }
      },
    );

    test(
      'It should log into account',
      async () => {
        const response = await request(app).post('/api/auth/login').send(accountData);
        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeTruthy();
      },
    );
  },
);
