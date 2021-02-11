const { AsyncLocalStorage } = require('async_hooks');

const store = new AsyncLocalStorage();

module.exports = store;
