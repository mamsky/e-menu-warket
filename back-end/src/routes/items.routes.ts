import express from 'express';
import {
  createDataItemsControllers,
  deleteDataItemsController,
  getAllItemsControllers,
  getDataItemsByIdControllers,
  updateDataItemsControllers,
} from '../controllers/items.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { uploadImage } from '../middlewares/multer.middleware';
const router = express.Router();
router.get('/', getAllItemsControllers);
router.get('/:id', authMiddleware, getDataItemsByIdControllers);
router.post('/', authMiddleware, uploadImage, createDataItemsControllers);
router.put('/:id', authMiddleware, uploadImage, updateDataItemsControllers);
router.delete('/:id', authMiddleware, deleteDataItemsController);

export default router;
