import cors from 'cors';
import express from 'express';
import { errorMiddleware } from './src/middlewares/error.middleware';
import routes from './src/routes/group.routes';
const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: 'GET,PUT,PATCH,POST,DELETE',
  }),
);
app.use(express.json());

app.use('/', routes);

app.use(errorMiddleware);

export default app;
