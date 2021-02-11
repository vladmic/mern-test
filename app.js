const env = process.env.ENV;
if (env !== 'heroku') {
  /* eslint-disable-next-line */
  const dotenv = require('dotenv').config();
  if (dotenv.error) {
    throw new Error(env.error.stack || env.message || env.error);
  }
}

const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const path = require('path');

const authRouter = require('./routes/auth');
const todosRouter = require('./routes/todos');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('frontend/build'));

app.use('/api/auth', authRouter);
app.use('/api/todos', todosRouter);

app.get('/*', (_, res) => res.sendFile(
  path.join(__dirname, 'frontend', 'build', 'index.html'),
));

module.exports = app;
