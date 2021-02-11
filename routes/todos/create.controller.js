const database = require('../../database');
const store = require('../../store');

module.exports = async (req, res) => {
  try {
    const { body: { text = '' } = {} } = req;
    if (!text) {
      return res.status(400).send({
        info: 'MISSING_DATA',
        status: 400,
      });
    }

    const { id } = store.getStore();
    const todoRecord = new database.Todo({
      userId: id,
      text,
    });

    await todoRecord.save();

    return res.status(200).send({
      info: 'OK',
      status: 200,
      todo: todoRecord,
    });
  } catch (error) {
    return res.status(500).send({
      error,
      info: 'INTERNAL_SERVER_ERROR',
      status: 500,
    });
  }
};
