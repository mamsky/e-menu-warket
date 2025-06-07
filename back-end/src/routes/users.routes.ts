import express from 'express';
import { getAllUsersControllers } from '../controllers/users.controllers';
const router = express.Router();

router.get('/', getAllUsersControllers);

export default router;
