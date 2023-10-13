// 400 Bad Request
const { statusCode } = require('../utils/constants');

module.exports = class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.dataError;
  }
};
