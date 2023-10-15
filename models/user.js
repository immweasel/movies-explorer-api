const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { emailRegex, message } = require('../utils/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(url) {
        return emailRegex.test(url);
      },
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name"  - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
    required: true,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredintails = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(message.loginValidationError));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(message.loginValidationError));
          }
          return user;
        });
    });
};

const User = mongoose.model('user', userSchema);
module.exports = User;
