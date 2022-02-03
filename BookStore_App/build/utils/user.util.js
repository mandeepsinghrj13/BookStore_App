"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyRole = exports.upload = exports.token = exports.setRole = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var _multer = _interopRequireDefault(require("multer"));

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = (0, _multer["default"])({
  storage: storage
}); //create token

exports.upload = upload;

var token = function token(findemail) {
  return _jsonwebtoken["default"].sign({
    email: findemail.email,
    id: findemail._id,
    role: findemail.role
  }, process.env.JWT_SECRET);
}; //create role admin/user


exports.token = token;

var setRole = function setRole(role) {
  return function (req, res, next) {
    req.role = role;
    next();
  };
}; //verify role admin/user


exports.setRole = setRole;

var verifyRole = function verifyRole(req, res, next) {
  if (req.user.role == 'admin') {
    next();
  } else {
    throw {
      code: _httpStatusCodes["default"].UNAUTHORIZED,
      message: 'Unauthorized User'
    };
  }
};

exports.verifyRole = verifyRole;