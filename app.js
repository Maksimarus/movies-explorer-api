import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { errors } from 'celebrate';
import limiter from './utils/limiter.js';
import corsOptions from './utils/cors.js';
import { PORT, MONGO_DB } from './env.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import router from './routes/index.js';
import errorsHandler from './middlewares/errorsHandler.js';

dotenv.config();

const app = express();
app.use('*', cors(corsOptions));

app.use(express.json());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(cookieParser());

app.use('/', router);

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
