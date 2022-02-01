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
