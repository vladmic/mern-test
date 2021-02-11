const express = require('express');

const authorize = require('../../middlewares/authorize');
const createTodo = require('./create.controller');
const getAllTodos = require('./get-all.controller');
const getOneTodo = require('./get-one.controller');
const deleteTodo = require('./delete.controller');
const updateTodo = require('./update.controller');

const router = express.Router();

router.get('/', authorize, getAllTodos);
router.get('/id/:id', authorize, getOneTodo);
router.delete('/id/:id', authorize, deleteTodo);
router.patch('/', authorize, updateTodo);
router.post('/', authorize, createTodo);

module.exports = router;
