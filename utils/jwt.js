require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');

const generateToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
  return token;
};

module.exports = { generateToken };
