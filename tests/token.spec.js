const createToken = require('../utilities/create-token');

const userId = `userId-${Date.now()}`;

describe(
  'Test token creation',
  () => {
    test(
      'It should create a new token',
      async () => {
        const token = await createToken(userId);
        expect(token).toBeTruthy();
      },
    );
  },
);
