const router = require('express').Router();
const validation = require('../middlewares/validations');
const { createMovie, deleteMovie, getMovie } = require('../controllers/movies');

router.get('/', getMovie);

router.post('/', validation.createMovie, createMovie);

router.delete('/:movieId', validation.checkMovieId, deleteMovie);

module.exports = router;
