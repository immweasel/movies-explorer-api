const router = require('express').Router();
const validation = require('../middlewares/validations');
const { updateUser, getUser } = require('../controllers/users');

router.get('/me', getUser);

router.patch('/me', validation.updateUser, updateUser);

module.exports = router;
