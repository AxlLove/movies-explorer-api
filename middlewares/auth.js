const jwt = require('jsonwebtoken');
require('dotenv').config();
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      const validationError = new UnauthorizedError('Необходима авторизация');
      return next(validationError);
    }
  }
  req.user = payload;
  next();
};
