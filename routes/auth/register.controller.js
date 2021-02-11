const { hash } = require('scryptwrap');

const createToken = require('../../utilities/create-token');
const database = require('../../database');

module.exports = async (req, res) => {
  try {
    const { body: { email = '', password = '' } = {} } = req;
    if (!(email && email.trim() && password && password.trim())) {
      return res.status(400).send({
        info: 'MISSING_DATA',
        status: 400,
      });
    }

    const existingUserRecord = await database.User.findOne({ email: email.trim() });
    if (existingUserRecord) {
      return res.status(400).send({
        info: 'EMAIL_ALREADY_IN_USE',
        status: 400,
      });
    }

    const userRecord = new database.User({ email: email.trim() });
    const [hashed] = await Promise.all([
      hash(password.trim()),
      userRecord.save(),
    ]);

    const idFieldName = '_id';
    const passwordRecord = new database.Password({
      userId: userRecord[idFieldName],
      hash: hashed,
    });

    const [token] = await Promise.all([
      createToken(userRecord[idFieldName]),
      passwordRecord.save(),
    ]);

    return res.status(200).send({
      info: 'OK',
      status: 200,
      token,
    });
  } catch (error) {
    return res.status(500).send({
      error,
      info: 'INTERNAL_SERVER_ERROR',
      status: 500,
    });
  }
};
