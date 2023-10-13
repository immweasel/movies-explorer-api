// 403 Forbidden
const { statusCode } = require('../utils/constants');

module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.accessIsDenied;
  }
};
