const rateLimit = require('express-rate-limit');
const { message } = require('../utils/constants');

const limiter = rateLimit({
  max: 1000,
  windowMs: 15 * 60 * 100000,
  message: message.limitRateInfo,
});

module.exports = limiter;
