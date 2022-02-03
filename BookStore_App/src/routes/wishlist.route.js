import express from 'express';
import * as wishController from '../controllers/wishlist.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a addToWish
router.post('/:bookId', userAuth, wishController.addToWish);

//route to create a removeBook
router.delete('/:bookId', userAuth, wishController.removeBook);

export default router;
