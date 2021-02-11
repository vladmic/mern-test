const database = require('../../database');
const pagination = require('../../utilities/pagination');
const store = require('../../store');

module.exports = async (req, res) => {
  try {
    const { limit, offset, page } = pagination(req);

    const { id } = store.getStore();
    const [todoRecords, total] = await Promise.all([
      database.Todo.find({ userId: id }).skip(offset).limit(limit),
      database.Todo.count({ userId: id }),
    ]);

    return res.status(200).send({
      info: 'OK',
      limit,
      offset,
      status: 200,
      page,
      todos: todoRecords,
      totalRecords: total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return res.status(500).send({
      error,
      info: 'INTERNAL_SERVER_ERROR',
      status: 500,
    });
  }
};
