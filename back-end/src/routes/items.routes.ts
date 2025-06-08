import express from 'express';
import {
  createDataItemsControllers,
  deleteDataItemsController,
  getAllItemsControllers,
  getDataItemsByIdControllers,
  updateDataItemsControllers,
} from '../controllers/items.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
const router = express.Router();

router.get('/', authMiddleware, getAllItemsControllers);
router.get('/:id', authMiddleware, getDataItemsByIdControllers);
router.post('/', authMiddleware, createDataItemsControllers);
router.put('/:id', authMiddleware, updateDataItemsControllers);
router.delete('/:id', authMiddleware, deleteDataItemsController);

export default router;
