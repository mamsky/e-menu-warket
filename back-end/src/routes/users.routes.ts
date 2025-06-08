import express from 'express';
import {
  createUsersControllers,
  getAllUsersControllers,
  loginUsersController,
} from '../controllers/users.controller';
const router = express.Router();

router.get('/', getAllUsersControllers);
router.post('/', createUsersControllers);
router.post('/auth', loginUsersController);

export default router;
