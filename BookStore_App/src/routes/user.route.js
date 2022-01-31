import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { setRole } from '../utils/user.util';

const router = express.Router();

//route to create a new user registration
router.post('/user', setRole('user'), newUserValidator, userController.register);

//route to create a new admin registration
router.post('/admin', setRole('admin'), newUserValidator, userController.register);

export default router;
