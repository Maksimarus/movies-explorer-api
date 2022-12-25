import express from 'express';
import { getMovies, createMovie, deleteMovie } from '../controllers/movieController.js';
import { idValidator, movieValidator } from '../validation/dataValidator.js';

const router = express.Router();

router.get('/', getMovies);
router.post('/', movieValidator, createMovie);
router.delete('/:_id', idValidator, deleteMovie);

export default router;
