const { statusCode, message } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  if (!err.statusCode) {
    res.status(statusCode.errorServer).send({ message: message.serverError });
  }
  res.status(err.statusCode).send({ message: err.message });
  return next();
};
