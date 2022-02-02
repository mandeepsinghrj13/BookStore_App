import express from 'express';
import { verifyRole } from '../utils/user.util';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a addToCart
router.post('/:bookId', userAuth, verifyRole, cartController.addToCart);

//route to get all Cart
router.get('', userAuth, cartController.getAllCarts);

export default router;
