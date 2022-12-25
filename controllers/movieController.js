import Movie from '../models/movie.js';
import { NotFound, Forbidden, BadRequest } from '../errors/index.js';

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
      next(new BadRequest('Введены некорректные данные фильма'));
    } else {
      next(err);
    }
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params._id);
    if (!movie) {
      throw new NotFound('Фильм с данным id не найдена');
    }
    if (movie.owner.toString() === req.user._id) {
      await Movie.findByIdAndRemove(req.params._id);
      res.send({ message: 'Фильм успешно удален' });
    } else {
      throw new Forbidden('Невозможно удалить чужой фильм');
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest('Передан некорректный id фильма'));
    } else {
      next(err);
    }
  }
};
