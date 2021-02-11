const jwt = require('jsonwebtoken');

const configuration = require('../configuration');

module.exports = (userId = '') => jwt.sign(
  {
    id: userId,
  },
  configuration.TOKEN_SECRET,
  {
    expiresIn: Number(configuration.TOKEN_EXPIRATION) * 1000,
  },
);
