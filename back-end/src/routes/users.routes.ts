import express from 'express';
import {
  authCheck,
  createUsersControllers,
  getAllUsersControllers,
  loginUsersController,
} from '../controllers/users.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
const router = express.Router();

router.get('/', getAllUsersControllers);
router.post('/', createUsersControllers);
router.post('/auth', loginUsersController);
router.get('/check', authMiddleware, authCheck);

export default router;
