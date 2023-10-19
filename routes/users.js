const router = require('express').Router();
const validation = require('../middlewares/validations');
const { getUser, updateUser } = require('../controllers/users');

router.get('/me', getUser);

router.patch('/me', validation.updateUser, updateUser);

module.exports = router;
