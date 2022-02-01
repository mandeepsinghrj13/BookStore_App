import express from 'express';
import * as userController from '../controllers/user.controller';
import { setRole } from '../utils/user.util';

const router = express.Router();

//route to create a new user registration
router.post('/user', setRole('user'), userController.register);

//route to create a new admin registration
router.post('/admin', setRole('admin'), userController.register);

export default router;
