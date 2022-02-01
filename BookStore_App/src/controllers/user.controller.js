import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import logger from '../config/logger';

/**
 * Controller to create a new user registration
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const register = async (req, res, next) => {
  try {
    const info = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: req.role
    };

    const data = await UserService.register(info);
    if (data) {
      logger.info('Registered Successfully');
      res.status(HttpStatus.CREATED).json({
        success: true,
        code: HttpStatus.CREATED,
        message: 'Registered Successfully',
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: data.role
        }
      });
    } else {
      logger.error('User Already Registered');
      res.status(HttpStatus.CONFLICT).json({
        success: false,
        code: HttpStatus.CONFLICT,
        message: 'User Already Registered'
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to user login
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const login = async (req, res, next) => {
  try {
    const info = {
      email: req.body.email,
      password: req.body.password
    };
    const data = await UserService.login(info);
    if (data === 'not register') {
      logger.error('User Not Register');
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'User Not Register'
      });
    } else if (data === 'wrong password') {
      logger.error('Wrong Password');
      res.status(HttpStatus.FORBIDDEN).json({
        code: HttpStatus.FORBIDDEN,
        message: 'Wrong Password'
      });
    } else {
      logger.info('Login Successfully');
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'Login Successfully',
        token: data
      });
    }
  } catch (error) {
    next(error);
  }
};
