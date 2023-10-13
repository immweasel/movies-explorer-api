// 401 Unauthorized
const { statusCode } = require('../utils/constants');

module.exports = class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.authError;
  }
};
