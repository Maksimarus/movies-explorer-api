import User from '../models/user.js';
import { NotFound, BadRequest } from '../errors/index.js';

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFound('Пользователь с данным id не найден');
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { name, email }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      throw new NotFound('Пользователь с данным id не найден');
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest('Введены некорректные данные пользователя'));
    } else {
      next(err);
    }
  }
};
