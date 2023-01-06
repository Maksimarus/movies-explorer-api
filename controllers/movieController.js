import Movie from '../models/movie.js';
import { NotFound, Forbidden, BadRequest } from '../errors/index.js';
import { movieErrorMessages } from '../constants/RespMessages.js';

export const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

export const createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    });
    res.status(201).send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest(movieErrorMessages.validationError));
    } else {
      next(err);
    }
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params._id);
    if (!movie) {
      throw new NotFound(movieErrorMessages.notFound);
    }
    if (movie.owner.toString() === req.user._id) {
      await Movie.findByIdAndRemove(req.params._id);
      res.send({ message: movieErrorMessages.deleteSuccess });
    } else {
      throw new Forbidden(movieErrorMessages.forbidden);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest(movieErrorMessages.incorrectId));
    } else {
      next(err);
    }
  }
};
