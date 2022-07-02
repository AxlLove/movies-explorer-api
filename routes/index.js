const router = require('express').Router();
const { NotFoundError } = require('../errors/NotFoundError');
const userRouter = require('./users');
const moviesRouter = require('./movies');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateLoginBody, validateRegisterBody } = require('../middlewares/validation');

router.post('/signin', validateLoginBody, login);
router.post('/signup', validateRegisterBody, createUser);
router.use(auth);
router.use('/', userRouter);
router.use('/', moviesRouter);

router.all('*', (_req, _res) => {
  throw new NotFoundError('Не существующий адрес');
});

module.exports = router;
