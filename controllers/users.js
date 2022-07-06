const bcrypt = require('bcryptjs');
const validator = require('validator');
const { ConflictError } = require('../errors/ConflictError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ValidationError } = require('../errors/ValidationError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');
const User = require('../models/user');
const { generateToken } = require('../utils/jwt');
const { MONGO_DUPLICATE_KEY_CODE } = require('../utils/constants');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  const validEmail = validator.isEmail(email);
  if (!validEmail) {
    throw new ValidationError('Некоректный email');
  }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.send({
        name: user.name, about: user.about, avatar: user.avatar, email: user.email, _id: user.id,
      });
    })
    .catch(
      (err) => {
        if (err.name === 'ValidationError') {
          const validationError = new ValidationError('Переданы некорректные данные при создании пользователя');
          return next(validationError);
        }
        if (err.code === MONGO_DUPLICATE_KEY_CODE) {
          const conflictError = new ConflictError('Такой email уже занят');
          return next(conflictError);
        }
        next(err);
      },
    );
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ValidationError('Не верный логин или пароль');
  }
  const validEmail = validator.isEmail(email);
  if (!validEmail) {
    throw new ValidationError('Некоректный email');
  }
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          return user;
        });
    })
    .then((user) => generateToken({ id: user._id }))
    .then((token) => res.status(200).send({ token }))
    .catch(
      (err) => {
        next(err);
      },
    );
};
const getCurrentUser = (req, res, next) => {
  const { id } = req.user;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.send(user);
    })
    .catch(
      (err) => {
        if (err.kind === 'ObjectId') {
          const validationError = new ValidationError('Не корректный _id');
          return next(validationError);
        }
        next(err);
      },
    );
};
const updateUser = (req, res, next) => {
  const user = req.user.id;
  const { name, email } = req.body;
  User.findByIdAndUpdate(user, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((updatedUser) => {
      if (!updatedUser) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.send(updatedUser);
    })
    .catch(
      (err) => {
        if (err.name === 'ValidationError') {
          const validationError = new ValidationError('Не корретно введены данные');
          return next(validationError);
        }
        if (err.code === MONGO_DUPLICATE_KEY_CODE) {
          const conflictError = new ConflictError('Такой email уже занят');
          return next(conflictError);
        }
        next(err);
      },
    );
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
};
