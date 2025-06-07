import express from 'express';
const groupRoutes = express.Router();
import usersRoutes from './users.routes';

groupRoutes.use('/users', usersRoutes);

export default groupRoutes;
