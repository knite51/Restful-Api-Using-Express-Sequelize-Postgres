import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { homeRouter, userRouter } from './routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: 'false' }));
app.use(morgan('dev'));
app.use(cors());

const baseRoute = '/resfulApi';

// connect with routes
app.use(`${baseRoute}/`, homeRouter);
app.use(`${baseRoute}/users`, userRouter);

export default app;
