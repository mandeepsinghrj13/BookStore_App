import HttpStatus from 'http-status-codes';
import * as UserService from '../services/book.service';
import logger from '../config/logger';

export const addBook = (req, res, next) => {
  try {
    // const bookDetails = {
    //   author: req.body.author,
    //   title: req.body.title,
    //   quantity: req.body.quantity,
    //   price: req.body.price,
    //   description: req.body.description
    // };
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
