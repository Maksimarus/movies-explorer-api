import express from 'express';
import authRouter from './authRouter.js';
import movieRouter from './movieRouter.js';
import userRouter from './userRouter.js';
import auth from '../middlewares/auth.js';

const router = express.Router();
router.use('/', authRouter);

router.use(auth);
router.use('/movie', movieRouter);
router.use('/users', userRouter);

export default router;
