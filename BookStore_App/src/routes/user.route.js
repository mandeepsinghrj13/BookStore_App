import express from 'express';
import { setRole } from '../utils/user.util';
import * as userController from '../controllers/user.controller';
import { registerValidator, loginValidator } from '../validators/user.validator';

const router = express.Router();

//route to create a new user registration
router.post('/user', setRole('user'), registerValidator, userController.register);

//route to create a new admin registration
router.post('/admin', setRole('admin'), registerValidator, userController.register);

//route to login user
router.post('/login', loginValidator, userController.login);

export default router;
