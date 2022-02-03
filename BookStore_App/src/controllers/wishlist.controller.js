import HttpStatus from 'http-status-codes';
import * as WishlistService from '../services/wishlist.service';

/**
 * Controller to AddToWishlist
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addToWish = async (req, res, next) => {
  try {
    const info = {
      userId: req.user.id,
      bookId: req.params.bookId
    };
    const data = await WishlistService.addToWish(info);
    if (data == true) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'Book Added Into wishlist Successfully'
      });
    } else if (data == 'Book Already Present') {
      res.status(HttpStatus.CONFLICT).json({
        code: HttpStatus.CONFLICT,
        message: 'Book Already Into wishlist'
      });
    } else {
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'Book Not Found'
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to RemoveBookIntoWishlist
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const removeBook = async (req, res, next) => {
  try {
    const id = { userId: req.user.id, bookId: req.params.bookId };
    const data = await WishlistService.removeBook(id);
    if (data) {
      return res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'Book Removed From Wishlist Successfully'
      });
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'Book Not Found In Wishlist'
      });
    }
  } catch (error) {
    next(error);
  }
};
