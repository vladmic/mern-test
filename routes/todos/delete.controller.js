const database = require('../../database');
const store = require('../../store');

module.exports = async (req, res) => {
  try {
    const { params: { id: todoId = '' } = {} } = req;
    if (!todoId) {
      return res.status(400).send({
        info: 'MISSING_DATA',
        status: 400,
      });
    }

    const { id } = store.getStore();

    await database.Todo.deleteOne({
      _id: todoId,
      userId: id,
    });

    return res.status(200).send({
      info: 'OK',
      status: 200,
    });
  } catch (error) {
    return res.status(500).send({
      error,
      info: 'INTERNAL_SERVER_ERROR',
      status: 500,
    });
  }
};
