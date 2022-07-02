const router = require('express').Router();
const {
  getCurrentUser, updateUser,
} = require('../controllers/users');
const { validateUpdateUserBody } = require('../middlewares/validation');

router.get('/users/me', getCurrentUser);

router.patch('/users/me', validateUpdateUserBody, updateUser);

module.exports = router;
