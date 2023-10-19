const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');

const { statusCode, message } = require('../utils/constants');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })

    .then((movie) => {
      res.status(statusCode.successCreate).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(message.updateUserError));
      }
      return next(err);
    });
};

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => {
      res.send({ movies });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
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
          .catch((err) => {
            next(err);
          });
      }
      return Promise.reject(new ForbiddenError(message.updateUserError));
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
