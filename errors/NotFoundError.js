// 404 Not Found
const { statusCode } = require('../utils/constants');

module.exports = class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.errorNotFound;
  }
};
