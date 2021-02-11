const { compare } = require('scryptwrap');

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

    const userRecord = await database.User.findOne({ email: email.trim() });
    if (!userRecord) {
      return res.status(401).send({
        info: 'ACCESS_DENIED',
        status: 401,
      });
    }

    const idFieldName = '_id';
    const passwordRecord = await database.Password.findOne({ userId: userRecord[idFieldName] });
    if (!passwordRecord) {
      return res.status(401).send({
        info: 'ACCESS_DENIED',
        status: 401,
      });
    }

    const comparison = await compare(passwordRecord.hash, password.trim());
    if (!comparison) {
      return res.status(401).send({
        info: 'ACCESS_DENIED',
        status: 401,
      });
    }

    const token = await createToken(userRecord[idFieldName]);

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
