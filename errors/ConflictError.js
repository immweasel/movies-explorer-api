// 409 Conflict
const { statusCode } = require('../utils/constants');

module.exports = class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.dataDublicate;
  }
};
