import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { Conflict, BadRequest } from '../errors/index.js';
import { SECRET_KEY } from '../env.js';
import { userErrorMessages, authSuccessMessage, logoutMessage } from '../constants/RespMessages.js';

export const register = async (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({
      name, email, password: hash,
    });
    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new Conflict(userErrorMessages.conflict));
    } else if (err.name === 'ValidationError') {
      next(new BadRequest(userErrorMessages.badRequest));
    } else {
      next(err);
    }
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      secure: true,
      sameSite: false,
    });
    res.send({ message: authSuccessMessage });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res, next) => {
  try {
    res.clearCookie('jwt').send({ message: logoutMessage });
  } catch (err) {
    next(err);
  }
};
