const { isMaster } = require('cluster');
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');

const { DATABASE_CONNECTION } = require('../configuration');
const log = require('../utilities/log');

const basename = path.basename(__filename);

mongoose.connect(
  DATABASE_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

const { connection } = mongoose;

if (!connection) {
  throw new Error('database: connection failed');
}

connection.on('error', (error) => log(`database: ERROR\n${error}`));
connection.on('disconnected', () => log('database: disconnected'));
connection.once('open', () => log('database: connected'));

process.on('SIGINT', () => connection.close(
  () => isMaster && log('database: closing connection'),
));

fs.readdirSync(`${__dirname}/models`)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const [schema] = file.split('.');
    const name = `${schema[0].toUpperCase()}${schema.slice(1)}`;
    /* eslint-disable-next-line */
    connection[name] = mongoose.model(name, require(`./models/${file}`)(mongoose));
  });

module.exports = connection;
