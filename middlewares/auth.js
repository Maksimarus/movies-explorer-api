import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../env.js';
import { Unauthorized } from '../errors/index.js';

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    next(new Unauthorized('Необходима авторизация'));
  }
  req.user = payload;
  next();
};

export default auth;
