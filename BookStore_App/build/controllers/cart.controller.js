"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeBookFromCart = exports.placeOrder = exports.getCart = exports.getAllCarts = exports.addToCart = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var UserService = _interopRequireWildcard(require("../services/cart.service"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var _logger = _interopRequireDefault(require("../config/logger"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Controller to  addToCart
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
var addToCart = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var userInfo, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            userInfo = {
              userId: req.user.id,
              bookId: req.params.bookId,
              quantity: req.body.quantity
            };
            _context.next = 4;
            return UserService.addToCart(userInfo);

          case 4:
            data = _context.sent;

            if (data == true) {
              res.status(_httpStatusCodes["default"].OK).json({
                message: 'book add into card'
              });
            } else if (data == 'Book qty Update') {
              res.status(_httpStatusCodes["default"].OK).json({
                message: 'Book Quantity Update'
              });
            } else if (data == 'Book Not Found') {
              res.status(_httpStatusCodes["default"].NOT_FOUND).json({
                message: 'Book Not Found'
              });
            } else if (data == 'Book Quantity Is Less') {
              res.status(_httpStatusCodes["default"].NOT_ACCEPTABLE).json({
                message: 'Please Enter Less Quantity'
              });
            } else if (data == 'Zero') {
              res.status(_httpStatusCodes["default"].NOT_ACCEPTABLE).json({
                message: 'Book Quantity Zero/0 Not Acceptable'
              });
            }

            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function addToCart(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Controller to  getAllCarts
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.addToCart = addToCart;

var getAllCarts = function getAllCarts(req, res, next) {
  try {
    UserService.getAllCarts(function (error, data) {
      if (data) {
        _logger["default"].info('Geting All Cart Successfully');

        res.status(_httpStatusCodes["default"].OK).json({
          code: _httpStatusCodes["default"].OK,
          message: 'Geting All Cart Successfully',
          data: data
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Controller to get a Cart
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.getAllCarts = getAllCarts;

var getCart = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var info, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            info = {
              userId: req.params.userId
            };
            _context2.next = 4;
            return UserService.getCart(info);

          case 4:
            data = _context2.sent;

            if (data == 'Cart Is Empty') {
              _logger["default"].error('Need To Add Book, Cart Is Empty');

              res.status(_httpStatusCodes["default"].NOT_FOUND).json({
                code: _httpStatusCodes["default"].NOT_FOUND,
                message: 'Need To Add Book, Cart Is Empty'
              });
            } else if (data == 'Cart Not Found') {
              res.status(_httpStatusCodes["default"].NOT_FOUND).json({
                code: _httpStatusCodes["default"].NOT_FOUND,
                message: 'Need To Add Book, Cart Not Found'
              });
            } else {
              _logger["default"].info('Cart Fetched Successfully');

              res.status(_httpStatusCodes["default"].OK).json({
                code: _httpStatusCodes["default"].OK,
                message: 'Cart Fetched Successfully',
                data: data
              });
            }

            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function getCart(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Controller to Order Place
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.getCart = getCart;

var placeOrder = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var info, data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            info = {
              userId: req.params.userId,
              isPurchased: req.body.isPurchased
            };
            _context3.next = 4;
            return UserService.placeOrder(info);

          case 4:
            data = _context3.sent;

            if (data == 'Cart Is Empty') {
              _logger["default"].error('Need To Add Book, Cart Is Empty');

              res.status(_httpStatusCodes["default"].NOT_FOUND).json({
                code: _httpStatusCodes["default"].NOT_FOUND,
                message: 'Need To Add Book, Cart Is Empty'
              });
            } else if (data == 'Cart Not Found') {
              res.status(_httpStatusCodes["default"].NOT_FOUND).json({
                code: _httpStatusCodes["default"].NOT_FOUND,
                message: 'Need To Add Book, Cart Not Found'
              });
            } else if (data == false) {
              res.status(_httpStatusCodes["default"].OK).json({
                code: _httpStatusCodes["default"].OK,
                message: 'Order Cencel Successfully'
              });
            } else {
              _logger["default"].info('Order Placed Successfully');

              res.status(_httpStatusCodes["default"].OK).json({
                code: _httpStatusCodes["default"].OK,
                message: 'Order Placed Successfully'
              });
            }

            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            next(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function placeOrder(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.placeOrder = placeOrder;

var removeBookFromCart = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = {
              userId: req.params.userId,
              bookId: req.body.bookId
            };
            _context4.next = 4;
            return UserService.removeBookFromCart(id);

          case 4:
            data = _context4.sent;

            if (!data) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              success: true,
              message: 'Book Removed From Cart Successfully'
            }));

          case 9:
            return _context4.abrupt("return", res.status(404).json({
              success: false,
              message: 'Book Not Found In Cart'
            }));

          case 10:
            _context4.next = 15;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            res.status(500).send({
              success: false,
              message: 'Internal server error'
            });

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 12]]);
  }));

  return function removeBookFromCart(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

exports.removeBookFromCart = removeBookFromCart;