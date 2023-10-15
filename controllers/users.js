require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { statusCode, message, SECRET_KEY } = require('../utils/constants');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const createUser = (req, res, next) => {
  const { email, name } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then((user) => {
          const { _id } = user;
          return res.status(statusCode.successCreate).send({ email, name, _id });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(new BadRequestError(message.registrationError));
          }
          if (err.code === 11000) {
            return next(new ConflictError(message.emailNotUniqueError));
          }
          return next(err);
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredintails(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET_KEY,
        { expiresIn: '7d' },
      );
      return res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ token });
    })
    .catch(next);
};

const logoutUser = (req, res, next) => {
  try {
    res.clearCookie('jwt', { httpOnly: true }).send({ exit: 'Выход пользователя из системы успешен' });
  } catch (err) {
    next(err);
  }
};

const getUser = (req, res, next) => {
  User.findById(req.user._id).select('+email')
    .then((user) => { res.send(user); })
    .catch((err) => { next(err); });
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => (res.send(user)))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new BadRequestError(message.updateUserError));
      }
      if (err.code === 11000) {
        return next(new ConflictError(message.emailNotUniqueError));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  login,
  logoutUser,
  getUser,
  updateUser,
};
