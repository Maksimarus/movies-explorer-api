import express from 'express';
import { login, register, logout } from '../controllers/authController.js';
import { loginValidator, registerValidator } from '../validation/dataValidator.js';

const router = express.Router();

router.post('/signin', loginValidator, login);
router.post('/signup', registerValidator, register);
router.post('/signout', logout);

export default router;
