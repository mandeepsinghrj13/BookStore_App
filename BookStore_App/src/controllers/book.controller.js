import HttpStatus from 'http-status-codes';
import * as UserService from '../services/book.service';
import logger from '../config/logger';

/**
 * Controller to Add Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addBook = (req, res, next) => {
  try {
    UserService.addBook(req.body, (error, data) => {
      if (data) {
        logger.info('Book Inserted Successfully');
        res.status(HttpStatus.CREATED).send({
          code: HttpStatus.CREATED,
          message: 'Book Inserted Successfully',
          data: data
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
