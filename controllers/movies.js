const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');

const { statusCode, message } = require('../utils/constants');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duretion,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duretion,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(statusCode.successCreate).send(movie);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new BadRequestError(message.updateUserError));
      }
      return next(error);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(message.pathNotFoundError));
      }
      if (movie.owner.equals(req.user._id)) {
        return movie.deleteOne()
          .then(() => {
            res.send({ message: message.removeSuccessful });
          })
          .catch((error) => {
            next(error);
          });
      }
      return Promise.reject(new ForbiddenError(message.updateUserError));
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movie) => {
      res.send({ movie });
    })
    .catch((error) => {
      next(error);
    });
};
