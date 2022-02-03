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
    const body = {
      bookImage: req.file.path,
      author: req.body.author,
      title: req.body.title,
      quantity: req.body.quantity,
      price: req.body.price,
      description: req.body.description
    };
    UserService.addBook(body, (error, data) => {
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

/**
 * Controller to get all Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const allBook = (req, res, next) => {
  try {
    UserService.allBook((error, data) => {
      if (data) {
        logger.info('Geting All Book Successfully');
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          message: 'Geting All Book Successfully',
          data: data
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getBook = async (req, res, next) => {
  try {
    const data = await UserService.getBook(req.params.BookId);
    if (data == null) {
      logger.error('Id Not Found');
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'Id Not Found'
      });
    } else {
      logger.info('Book fetched successfully');
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'Book fetched successfully',
        data: data
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateBook = (req, res, next) => {
  try {
    UserService.updateBook(req.params.BookId, req.body)
      .then((data) => {
        logger.info('Book updated successfully');
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          message: 'Book updated successfully',
          data: data
        });
      })
      .catch(() => {
        logger.error('BookId Not Found');
        return res.status(HttpStatus.NOT_FOUND).json({
          code: HttpStatus.NOT_FOUND,
          message: 'BookId Not Found'
        });
      });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteBook = async (req, res, next) => {
  try {
    const data = await UserService.deleteBook(req.params.BookId);
    if (data == null) {
      logger.error('Id Not Found');
      return res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'Id Not Found'
      });
    }
    logger.info('Book deleted successfully');
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'Book deleted successfully',
      data: data
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get Book by title
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const serchTitle = async (req, res, next) => {
  try {
    const data = await UserService.serchTitle(req.params.title);
    if (data.length !== 0) {
      logger.info('Title Fetched Successfully');
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'Title Fetched Successfully',
        data: data
      });
    } else {
      logger.error('Title Not Found');
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'Title Not Found'
      });
    }
  } catch (error) {
    next(error);
  }
};
