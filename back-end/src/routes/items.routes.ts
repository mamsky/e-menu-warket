import express from 'express';
import { getAllItemsControllers } from '../controllers/items.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
const router = express.Router();

router.get('/', authMiddleware, getAllItemsControllers);

export default router;
