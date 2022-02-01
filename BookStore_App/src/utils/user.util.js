import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';

export const token = (findemail) => {
  return jwt.sign({ email: findemail.email, id: findemail._id, role: findemail.role }, process.env.JWT_SECRET);
};

export const setRole = (role) => {
  return (req, res, next) => {
    req.role = role;
    next();
  };
};

export const verifyRole = (req, res, next) => {
  if (req.user.role == 'admin') {
    next();
  } else {
    throw {
      code: HttpStatus.UNAUTHORIZED,
      message: 'Unauthorized User'
    };
  }
};
