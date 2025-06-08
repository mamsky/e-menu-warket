import express from 'express';
import { errorMiddleware } from './src/middlewares/error.middleware';
import routes from './src/routes/group.routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: 'GET,PUT,PATCH,POST,DELETE',
  }),
);

app.use('/', routes);

app.use(errorMiddleware);

export default app;
