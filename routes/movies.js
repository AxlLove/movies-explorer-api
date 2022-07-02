const router = require('express').Router();
const { validateCreateMovieBody, validateDeleteMovieParamsId } = require('../middlewares/validation');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', validateCreateMovieBody, createMovie);

router.delete('/movies/:movieId', validateDeleteMovieParamsId, deleteMovie);

module.exports = router;
