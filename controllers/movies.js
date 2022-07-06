const { ForbiddenError } = require('../errors/ForbiddenError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ValidationError } = require('../errors/ValidationError');
const Movie = require('../models/movie');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const owner = req.user.id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((card) => res.send(card))
    .catch(
      (err) => {
        if (err.name === 'ValidationError') {
          const validationError = new ValidationError('Переданы некорректные данные при добавлении фильма');
          return next(validationError);
        }
        next(err);
      },
    );
};

const getMovies = (_, res, next) => {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch((err) => next(err));
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((findedMovie) => {
      if (!findedMovie) {
        throw new NotFoundError('Фильм с указанным _id не найден.');
      }
      if (findedMovie.owner._id.toString() !== req.user.id) {
        throw new ForbiddenError('У вас нет прав на удаление фильма');
      }
      return movieId;
    }).then((Id) => Movie.findByIdAndRemove(Id)
      .then((movie) => {
        res.send(movie);
      })).catch(
      (err) => {
        if (err.kind === 'ObjectId') {
          const validationError = new ValidationError('Не корректный _id');
          return next(validationError);
        }
        next(err);
      },
    );
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
