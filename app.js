import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { errors } from 'celebrate';
import { rateLimit } from 'express-rate-limit';
import { PORT, MONGO_DB } from './env.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import router from './routes/index.js';
import { NotFound } from './errors/index.js';
import errorsHandler from './middlewares/errorsHandler.js';

dotenv.config();
const options = {
  origin: [
    'http://localhost:3002',
    'http://bestfilm.maksimar.nomoredomains.club',
    'http://api.bestfilm.maksimar.nomoredomains.club',
    'https://bestfilm.maksimar.nomoredomains.club',
    'https://api.bestfilm.maksimar.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'credentials'],
  credentials: true,
};
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();
app.use('*', cors(options));

app.use(express.json());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(cookieParser());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);
app.use('*', () => {
  throw new NotFound('Введен несуществующий путь');
});

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

mongoose.set('strictQuery', false);
try {
  mongoose.connect(MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
} catch (err) {
  console.log(`Не удалось запустить сервер из-за ошибки ${err}`);
}
