"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeBookFromCart = exports.placeOrder = exports.getCart = exports.getAllCarts = exports.addToCart = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cart = _interopRequireDefault(require("../models/cart.model"));

var _book = _interopRequireDefault(require("../models/book.model"));

var addToCart = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userInfo) {
    var available, usercart, cart, bookpresent, newbook, index, _newbook;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (!(userInfo.quantity == 0)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", 'Zero');

          case 5:
            _context.next = 7;
            return _book["default"].findOne({
              _id: userInfo.bookId
            });

          case 7:
            available = _context.sent;

            if (!available) {
              _context.next = 49;
              break;
            }

            _context.next = 11;
            return _cart["default"].findOne({
              userId: userInfo.userId
            });

          case 11:
            usercart = _context.sent;

            if (usercart) {
              _context.next = 22;
              break;
            }

            if (!(available.quantity >= userInfo.quantity)) {
              _context.next = 19;
              break;
            }

            cart = new _cart["default"]({
              userId: userInfo.userId,
              book: [{
                bookId: userInfo.bookId,
                quantity: userInfo.quantity
              }]
            });
            cart.save();
            return _context.abrupt("return", true);

          case 19:
            return _context.abrupt("return", 'Book Quantity Is Less');

          case 20:
            _context.next = 47;
            break;

          case 22:
            _context.next = 24;
            return _cart["default"].findOne({
              userId: userInfo.userId,
              'book.bookId': userInfo.bookId
            });

          case 24:
            bookpresent = _context.sent;

            if (!(bookpresent == null)) {
              _context.next = 36;
              break;
            }

            if (!(available.quantity >= userInfo.quantity)) {
              _context.next = 33;
              break;
            }

            newbook = {
              bookId: userInfo.bookId,
              quantity: userInfo.quantity
            };
            _context.next = 30;
            return _cart["default"].findOneAndUpdate({
              userId: userInfo.userId
            }, {
              $push: {
                book: newbook
              }
            });

          case 30:
            return _context.abrupt("return", true);

          case 33:
            return _context.abrupt("return", 'Book Quantity Is Less');

          case 34:
            _context.next = 47;
            break;

          case 36:
            if (!(available.quantity >= userInfo.quantity)) {
              _context.next = 46;
              break;
            }

            index = bookpresent.book.findIndex(function (item) {
              return item.bookId == userInfo.bookId;
            });
            _newbook = {
              bookId: bookpresent.book[index].bookId,
              quantity: bookpresent.book[index].quantity + userInfo.quantity
            };
            _context.next = 41;
            return _cart["default"].updateOne({
              userId: userInfo.userId
            }, {
              $pull: {
                book: bookpresent.book[index]
              }
            });

          case 41:
            _context.next = 43;
            return _cart["default"].findOneAndUpdate({
              userId: userInfo.userId
            }, {
              $push: {
                book: _newbook
              }
            });

          case 43:
            return _context.abrupt("return", 'Book qty Update');

          case 46:
            return _context.abrupt("return", 'Book Quantity Is Less');

          case 47:
            _context.next = 50;
            break;

          case 49:
            return _context.abrupt("return", 'Book Not Found');

          case 50:
            _context.next = 55;
            break;

          case 52:
            _context.prev = 52;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 55:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 52]]);
  }));

  return function addToCart(_x) {
    return _ref.apply(this, arguments);
  };
}(); //get All Carts


exports.addToCart = addToCart;

var getAllCarts = function getAllCarts(callback) {
  _cart["default"].find(function (error, data) {
    if (data) {
      return callback(null, data);
    } else {
      return callback(error, null);
    }
  });
}; //get a Cart


exports.getAllCarts = getAllCarts;

var getCart = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(info) {
    var cart, book;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _cart["default"].findOne({
              userId: info.userId
            });

          case 3:
            cart = _context2.sent;

            if (!cart) {
              _context2.next = 13;
              break;
            }

            book = cart.book.length;

            if (!(book == 0)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", 'Cart Is Empty');

          case 10:
            return _context2.abrupt("return", cart);

          case 11:
            _context2.next = 14;
            break;

          case 13:
            return _context2.abrupt("return", 'Cart Not Found');

          case 14:
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", _context2.t0);

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 16]]);
  }));

  return function getCart(_x2) {
    return _ref2.apply(this, arguments);
  };
}(); //put Order Place


exports.getCart = getCart;

var placeOrder = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(info) {
    var cart, book;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _cart["default"].findOne({
              userId: info.userId
            });

          case 3:
            cart = _context3.sent;

            if (!cart) {
              _context3.next = 21;
              break;
            }

            book = cart.book.length;

            if (!(book == 0)) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", 'Cart Is Empty');

          case 10:
            if (!(cart.isPurchased == false)) {
              _context3.next = 16;
              break;
            }

            _context3.next = 13;
            return _cart["default"].findOneAndUpdate({
              userId: info.userId
            }, {
              isPurchased: info.isPurchased
            }, {
              "new": true
            });

          case 13:
            return _context3.abrupt("return", true);

          case 16:
            _context3.next = 18;
            return _cart["default"].findOneAndUpdate({
              userId: info.userId
            }, {
              isPurchased: info.isPurchased
            }, {
              "new": true
            });

          case 18:
            return _context3.abrupt("return", false);

          case 19:
            _context3.next = 22;
            break;

          case 21:
            return _context3.abrupt("return", 'Cart Not Found');

          case 22:
            _context3.next = 27;
            break;

          case 24:
            _context3.prev = 24;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", _context3.t0);

          case 27:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 24]]);
  }));

  return function placeOrder(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.placeOrder = placeOrder;

var removeBookFromCart = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(data) {
    var cart, itemIndex;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _cart["default"].findOne({
              userId: data.userId
            });

          case 3:
            cart = _context4.sent;

            if (!cart) {
              _context4.next = 13;
              break;
            }

            itemIndex = cart.book.findIndex(function (p) {
              return p.bookId == data.bookId;
            });

            if (!(itemIndex >= 1)) {
              _context4.next = 12;
              break;
            }

            _context4.next = 9;
            return _cart["default"].updateOne({
              userId: data.userId
            }, {
              $pull: {
                book: {
                  bookId: data.bookId
                }
              }
            });

          case 9:
            return _context4.abrupt("return", true);

          case 12:
            return _context4.abrupt("return", false);

          case 13:
            _context4.next = 18;
            break;

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", _context4.t0);

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 15]]);
  }));

  return function removeBookFromCart(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.removeBookFromCart = removeBookFromCart;