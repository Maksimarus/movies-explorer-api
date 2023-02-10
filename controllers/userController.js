import User from '../models/user.js';
import { NotFound, BadRequest, Conflict } from '../errors/index.js';
import { userErrorMessages } from '../constants/RespMessages.js';

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFound(userErrorMessages.notFound);
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const foundedUser = await User.findOne({ email });
    if (foundedUser && req.user._id !== foundedUser._id.toString()) {
      throw new Conflict(userErrorMessages.conflict);
    }
    const user = await User.findByIdAndUpdate(req.user._id, { name, email }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      throw new NotFound(userErrorMessages.notFound);
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest(userErrorMessages.badRequest));
    } else {
      next(err);
    }
  }
};
