const request = require('supertest');

const app = require('../app');

const accountData = {
  email: `test-todos${Date.now()}@test.com`,
  password: `test-todos${Date.now()}`,
};
const todoData = {
  text: `Todo test text @ ${Date.now()}`,
};
let TOKEN = '';

beforeAll(async () => {
  const response = await request(app).post('/api/auth/register').send(accountData);
  TOKEN = response?.body?.token ?? '';
});

afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 500));
});

describe(
  'Test Todos APIs',
  () => {
    test(
      'It should not create a new Todo if there is no token',
      async () => {
        try {
          await request(app).post('/api/todos').send(todoData);
        } catch (error) {
          const { body: { info = '', status = null } = {} } = error;
          expect(info).toBe('ACCESS_DENIED');
          expect(status).toBe(401);
        }
      },
    );

    test(
      'It should not create a new Todo if token is invalid',
      async () => {
        try {
          await request(app).post('/api/todos').send(todoData).set('Authorization', `invalid-${TOKEN}`);
        } catch (error) {
          const { body: { info = '', status = null } = {} } = error;
          expect(info).toBe('ACCESS_DENIED');
          expect(status).toBe(401);
        }
      },
    );

    test(
      'It should create a new Todo',
      async () => {
        const response = await request(app).post('/api/todos').send(todoData).set('Authorization', TOKEN);
        expect(response.statusCode).toBe(200);
        expect(response.body.todo._id).toBeTruthy();
        expect(response.body.todo.completed).toBe(false);
        expect(response.body.todo.text).toBe(todoData.text);
      },
    );

    test(
      'It should get a single Todo by Todo ID',
      async () => {
        const response = await request(app).post('/api/todos').send(todoData).set('Authorization', TOKEN);
        const todoId = response.body.todo._id;
        const singleResponse = await request(app).get(`/api/todos/id/${todoId}`).set('Authorization', TOKEN);
        expect(singleResponse.statusCode).toBe(200);
        expect(singleResponse.body.todo._id).toBe(todoId);
      },
    );

    test(
      'It should get several Todo records',
      async () => {
        await request(app).post('/api/todos/').send(todoData).set('Authorization', TOKEN);
        const multipleTodos = await request(app).get('/api/todos').set('Authorization', TOKEN);
        expect(multipleTodos.statusCode).toBe(200);
        expect(multipleTodos.body.todos.length > 1).toBeTruthy();
        expect(multipleTodos.body.page).toBe(1);
        expect(multipleTodos.body.totalPages).toBe(1);
        expect(multipleTodos.body.totalRecords > 1).toBeTruthy();
      },
    );

    test(
      'It should get a single Todo with limit set to 1',
      async () => {
        const multipleTodos = await request(app).get('/api/todos/?limit=1').set('Authorization', TOKEN);
        expect(multipleTodos.statusCode).toBe(200);
        expect(multipleTodos.body.todos.length === 1).toBeTruthy();
      },
    );

    test(
      'It should get a single Todo with limit set to 1 and page set to 2',
      async () => {
        const multipleTodos = await request(app).get('/api/todos/?limit=1&page=2').set('Authorization', TOKEN);
        expect(multipleTodos.statusCode).toBe(200);
        expect(multipleTodos.body.todos.length === 1).toBeTruthy();
      },
    );

    test(
      'It should delete a Todo',
      async () => {
        const response = await request(app).post('/api/todos').send(todoData).set('Authorization', TOKEN);
        const todoId = response.body.todo._id;
        const deleteTodo = await request(app).delete(`/api/todos/id/${todoId}`).set('Authorization', TOKEN);
        expect(deleteTodo.statusCode).toBe(200);
      },
    );

    test(
      'It should update a Todo',
      async () => {
        const updateText = 'Hey there';
        const response = await request(app).post('/api/todos').send(todoData).set('Authorization', TOKEN);
        const todoId = response.body.todo._id;
        const updateTodo = await request(app).patch('/api/todos/').send({
          completed: true,
          id: todoId,
          text: updateText,
        }).set('Authorization', TOKEN);
        expect(updateTodo.statusCode).toBe(200);

        const singleResponse = await request(app).get(`/api/todos/id/${todoId}`).set('Authorization', TOKEN);
        expect(singleResponse.statusCode).toBe(200);
        expect(singleResponse.body.todo._id).toBe(todoId);
        expect(singleResponse.body.todo.completed).toBe(true);
        expect(singleResponse.body.todo.text).toBe(updateText);
      },
    );
  },
);
