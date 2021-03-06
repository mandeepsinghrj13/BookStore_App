import * as UserService from '../services/cart.service';
import HttpStatus from 'http-status-codes';
import logger from '../config/logger';

/**
 * Controller to  addToCart
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addToCart = async (req, res, next) => {
  try {
    const userInfo = {
      userId: req.user.id,
      bookId: req.params.bookId,
      quantity: req.body.quantity
    };
    const data = await UserService.addToCart(userInfo);
    if (data == true) {
      res.status(HttpStatus.OK).json({
        message: 'book add into card'
      });
    } else if (data == 'Book qty Update') {
      res.status(HttpStatus.OK).json({
        message: 'Book Quantity Update'
      });
    } else if (data == 'Book Not Found') {
      res.status(HttpStatus.NOT_FOUND).json({
        message: 'Book Not Found'
      });
    } else if (data == 'Book Quantity Is Less') {
      res.status(HttpStatus.NOT_ACCEPTABLE).json({
        message: 'Please Enter Less Quantity'
      });
    } else if (data == 'Zero') {
      res.status(HttpStatus.NOT_ACCEPTABLE).json({
        message: 'Book Quantity Zero/0 Not Acceptable'
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to  getAllCarts
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllCarts = (req, res, next) => {
  try {
    UserService.getAllCarts((error, data) => {
      if (data) {
        logger.info('Geting All Cart Successfully');
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          message: 'Geting All Cart Successfully',
          data: data
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a Cart
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getCart = async (req, res, next) => {
  try {
    const info = {
      userId: req.params.userId
    };
    const data = await UserService.getCart(info);
    if (data == 'Cart Is Empty') {
      logger.error('Need To Add Book, Cart Is Empty');
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'Need To Add Book, Cart Is Empty'
      });
    } else if (data == 'Cart Not Found') {
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'Need To Add Book, Cart Not Found'
      });
    } else {
      logger.info('Cart Fetched Successfully');
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'Cart Fetched Successfully',
        data: data
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to Order Place
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const placeOrder = async (req, res, next) => {
  try {
    const info = {
      userId: req.params.userId,
      isPurchased: req.body.isPurchased
    };
    const data = await UserService.placeOrder(info);
    if (data == 'Cart Is Empty') {
      logger.error('Need To Add Book, Cart Is Empty');
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'Need To Add Book, Cart Is Empty'
      });
    } else if (data == 'Cart Not Found') {
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'Need To Add Book, Cart Not Found'
      });
    } else if (data == false) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'Order Cencel Successfully'
      });
    } else {
      logger.info('Order Placed Successfully');
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'Order Placed Successfully'
      });
    }
  } catch (error) {
    next(error);
  }
};

export const removeBookFromCart = async (req, res) => {
  try {
    const id = { userId: req.params.userId, bookId: req.body.bookId };
    const data = await UserService.removeBookFromCart(id);
    if (data) {
      return res.status(200).json({
        success: true,
        message: 'Book Removed From Cart Successfully'
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Book Not Found In Cart'
      });
    }
  } catch {
    res.status(500).send({
      success: false,
      message: 'Internal server error'
    });
  }
};
