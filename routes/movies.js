const router = require('express').Router();
const validation = require('../middlewares/validations');
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', validation.createMovie, createMovie);

router.delete('/:movieId', validation.checkMovieId, deleteMovie);

module.exports = router;
