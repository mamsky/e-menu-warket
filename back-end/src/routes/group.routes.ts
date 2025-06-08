import express from 'express';
const groupRoutes = express.Router();
import usersRoutes from './users.routes';
import itemsRoutes from './items.routes';

groupRoutes.use('/users', usersRoutes);
groupRoutes.use('/items', itemsRoutes);

export default groupRoutes;
