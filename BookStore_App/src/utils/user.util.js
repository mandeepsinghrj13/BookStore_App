export const setRole = (role) => {
  return (req, res, next) => {
    req.role = role;
    next();
  };
};
