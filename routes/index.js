const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login, logoutUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { message } = require('../utils/constants');
const validation = require('../middlewares/validations');

router.post('/signup', validation.createUser, createUser);
router.post('/signin', validation.login, login);

router.get('/signout', logoutUser);

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('*', (req, res, next) => next(new NotFoundError(message.pathNotFoundError)));

module.exports = router;
