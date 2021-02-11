const jwt = require('jsonwebtoken');

const store = require('../store');
const { TOKEN_SECRET } = require('../configuration');

module.exports = async (req, res, next) => {
  try {
    const { authorization: token = '' } = req.headers || {};
    if (!token) {
      return res.status(401).send({
        info: 'MISSING_TOKEN',
        status: 401,
      });
    }

    const decoded = await jwt.verify(token, TOKEN_SECRET);
    const { id = null } = decoded || {};
    if (!id) {
      return res.status(401).send({
        info: 'INVALID_TOKEN',
        status: 401,
      });
    }

    store.enterWith({ id });
    return next();
  } catch (error) {
    if (error.name && error.name === 'TokenExpiredError') {
      return res.status(401).send({
        info: 'EXPIRED_TOKEN',
        status: 401,
      });
    }

    return res.status(401).send({
      info: 'INVALID_TOKEN',
      status: 401,
    });
  }
};
