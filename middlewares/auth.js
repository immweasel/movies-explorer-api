require('dotenv').config();
const jwt = require('jsonwebtoken');
const { SECRET_KEY, message } = require('../utils/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError(message.unauthorizedError));
  }
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new UnauthorizedError(message.tokenValidationError));
  }
  req.user = payload;
  return next();
};
