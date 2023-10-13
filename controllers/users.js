require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { statusCode, message, SECRET_KEY } = require('../utils/constants');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

module.exports.createUser = (req, res, next) => {
  const { email, name } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name,
        email,
        password: hash,
      })
        .then((user) => {
          const { _id } = user;
          return res.status(statusCode.successCreate).send({ email, name, _id });
        })
        .catch((error) => {
          if (error.name === 'ValidationError') {
            return next(new BadRequestError(message.registrationError));
          }
          if (error.code === 11000) {
            return next(new ConflictError(message.emailNotUniqueError));
          }
          return next(error);
        });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => (res.send(user)))
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        return next(new BadRequestError(message.updateUserError));
      }
      if (error.code === 11000) {
        return next(new ConflictError(message.emailNotUniqueError));
      }
      return next(error);
    });
};

module.exports.getUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id)
    .select('+email')
    .then((user) => { res.send(user); })
    .catch((error) => { next(error); });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredintails(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
      return res.send({ token });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.logoutUser = (req, res, next) => {
  try {
    res.clearCookie('jwt', { httpOnly: true }).send({ exit: 'user logget out' });
  } catch (error) {
    next(error);
  }
};
