const database = require('../../database');
const store = require('../../store');

module.exports = async (req, res) => {
  try {
    const { body: { completed = false, id: todoId = '', text = '' } = {} } = req;
    const completedKey = 'completed' in req.body;
    if (!(completedKey && todoId && todoId.trim() && text && text.trim())) {
      return res.status(400).send({
        info: 'MISSING_DATA',
        status: 400,
      });
    }

    const { id } = store.getStore();

    await database.Todo.updateOne(
      {
        _id: todoId,
        userId: id,
      },
      {
        completed,
        text: text.trim(),
      },
    );

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
