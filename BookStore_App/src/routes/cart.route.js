import express from 'express';
import { verifyRole } from '../utils/user.util';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a addToCart
router.post('/:bookId', userAuth, verifyRole, cartController.addToCart);

//route to get all Cart
router.get('', userAuth, cartController.getAllCarts);

//route to get a Cart
router.get('/:userId', userAuth, cartController.getCart);

//route to place Order
router.put('/:userId', userAuth, cartController.placeOrder);

//route to removeBookFromCart
router.delete('/:userId', userAuth, cartController.removeBookFromCart);

export default router;
