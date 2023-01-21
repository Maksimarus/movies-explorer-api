import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { Unauthorized } from '../errors/index.js';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    default: 'Пользователь',
    minlength: 2,
    maxlength: 30,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new Unauthorized('Неправильные почта или пароль');
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new Unauthorized('Неправильные почта или пароль');
  }
  return user;
};

export default mongoose.model('user', userSchema);
