const methodsAllowed = 'GET, HEAD, PUT, PATCH, POST, DELETE';

const allowedCors = [
  'http://api.immweasel.diploma.nomoredomainsrocks.ru',
  'http://immweasel.diploma.nomoredomainsrocks.ru',
  'https://api.immweasel.diploma.nomoredomainsrocks.ru',
  'https://immweasel.diploma.nomoredomainsrocks.ru',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3001',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  // разрешаю header отправлять куки
  res.header('Access-Control-Allow-Credentials', true);
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', methodsAllowed);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
