import express from 'express';
import { getUser, updateUser } from '../controllers/userController.js';
import { userValidator } from '../validation/dataValidator.js';

const router = express.Router();

router.get('/me', getUser);
router.patch('/me', userValidator, updateUser);

export default router;
