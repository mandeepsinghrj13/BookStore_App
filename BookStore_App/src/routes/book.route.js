import express from 'express';
import { verifyRole } from '../utils/user.util';
import * as bookController from '../controllers/book.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user registration
router.post('/book', userAuth, verifyRole, bookController.addBook);

export default router;
