import express from 'express';
import authRouter from './authRouter.js';
import movieRouter from './movieRouter.js';
import userRouter from './userRouter.js';
import auth from '../middlewares/auth.js';
import { NotFound } from '../errors/index.js';

const router = express.Router();

router.use('/', authRouter);

router.use(auth);
router.use('/movie', movieRouter);
router.use('/users', userRouter);

router.use('*', () => {
  throw new NotFound('Введен несуществующий путь');
});

export default router;
