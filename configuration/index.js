const { env: ev = {} } = process;

module.exports = {
  DATABASE_CONNECTION: ev.DATABASE_CONNECTION || '',
  ENV: ev.ENV || 'development',
  PORT: ev.PORT || 9000,
  TOKEN_EXPIRATION: ev.TOKEN_EXPIRATION || 86000,
  TOKEN_SECRET: ev.TOKEN_SECRET || 'super-secret',
};
