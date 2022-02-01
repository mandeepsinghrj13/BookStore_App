import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    jwt.verify(bearerToken, process.env.JWT_SECRET, (error, verifytoken) => {
      if (error) {
        throw {
          code: HttpStatus.UNAUTHORIZED,
          message: 'invalid token'
        };
      } else {
        req.user = verifytoken;
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};
