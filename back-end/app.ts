import express from 'express';
import { errorMiddleware } from './src/middlewares/error.middleware';
import routes from './src/routes/group.routes';
const app = express();

app.use(express.json());

app.use('/', routes);

app.use(errorMiddleware);

export default app;
