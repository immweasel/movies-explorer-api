const rateLimiter = require('express-rate-limit');
const { message } = require('../utils/constants');

const limiter = rateLimiter({
  max: 100,
  windowMS: 36000,
  message: message.limitRateInfo,
});

module.exports = limiter;
