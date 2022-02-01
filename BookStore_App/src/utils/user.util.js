import jwt from 'jsonwebtoken';

export const token = (findemail) => {
  const Token = {
    id: findemail._id,
    firstName: findemail.firstName,
    lastName: findemail.lastName,
    email: findemail.email
  };
  return jwt.sign({ Token }, process.env.JWT_SECRET);
};

export const setRole = (role) => {
  return (req, res, next) => {
    req.role = role;
    next();
  };
};
