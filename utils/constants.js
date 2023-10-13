const { config } = require('dotenv');

const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/im;
const emailRegex = /^((([0-9A-Za-z]{1}[-0-9A-z]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u;

const message = {
  serverError: 'На сервере произошла ошибка',
  limitRateInfo: 'Количетво запросов на сервер превышено. Повторите запрос позже',
  unauthorizedError: 'Ошибка при авторизации. Токен не передан или не в том формате',
  tokenValidationError: 'Ошибка при авторизации. Переданный токен некорректный',
  loginValidationError: 'Вы ввели неправильный логин или пароль',
  updateUserError: 'Ошибка при обновлении профиля',
  pathNotFoundError: 'Страница не найдена',
  removeSuccessful: 'Фильм удалён',
  registrationError: 'Произошла ошибка при регистрации',
  emailNotUniqueError: 'Пользователь с таким email уже есть',
  databaseConnectSuccessful: 'Соединение с базой данных успешно',
  databaseConnectNotSuccessful: 'Ошибка соединения с базой данных',
};

const statusCode = {
  dataError: 400,
  authError: 401,
  accessIsDenied: 403,
  errorNotFound: 404,
  dataDublicate: 409,
  errorServer: 500,
  successDone: 200,
  successCreate: 201,
};

const {
  DEV_SECRET = 'dev-secret',
  JWT_SECRET,
  NODE_ENV,
  PORT = 3000,
  DATABASE_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

if (NODE_ENV === 'production') { config(); }

const SECRET_KEY = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : DEV_SECRET;

module.exports = {
  urlRegex,
  emailRegex,
  message,
  statusCode,
  SECRET_KEY,
  NODE_ENV,
  PORT,
  DATABASE_URL,
};
