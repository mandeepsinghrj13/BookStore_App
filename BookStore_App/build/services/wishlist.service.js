"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeBook = exports.addToWish = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _wishlist = _interopRequireDefault(require("../models/wishlist.model"));

var _book = _interopRequireDefault(require("../models/book.model"));

//Add To Wishlist
var addToWish = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(info) {
    var available, addwishlist, data, bookpresent, newbook;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _book["default"].findOne({
              _id: info.bookId
            });

          case 3:
            available = _context.sent;

            if (!available) {
              _context.next = 27;
              break;
            }

            _context.next = 7;
            return _wishlist["default"].findOne({
              userId: info.userId
            });

          case 7:
            addwishlist = _context.sent;

            if (addwishlist) {
              _context.next = 14;
              break;
            }

            data = new _wishlist["default"]({
              userId: info.userId,
              book: [{
                bookId: info.bookId,
                title: available.title
              }]
            });
            data.save();
            return _context.abrupt("return", true);

          case 14:
            _context.next = 16;
            return _wishlist["default"].findOne({
              userId: info.userId,
              'book.bookId': info.bookId
            });

          case 16:
            bookpresent = _context.sent;

            if (!(bookpresent == null)) {
              _context.next = 24;
              break;
            }

            newbook = {
              bookId: info.bookId,
              title: available.title
            };
            _context.next = 21;
            return _wishlist["default"].findOneAndUpdate({
              userId: info.userId
            }, {
              $push: {
                book: newbook
              }
            });

          case 21:
            return _context.abrupt("return", true);

          case 24:
            return _context.abrupt("return", 'Book Already Present');

          case 25:
            _context.next = 28;
            break;

          case 27:
            return _context.abrupt("return", false);

          case 28:
            _context.next = 33;
            break;

          case 30:
            _context.prev = 30;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 30]]);
  }));

  return function addToWish(_x) {
    return _ref.apply(this, arguments);
  };
}(); //


exports.addToWish = addToWish;

var removeBook = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
    var wishList, itemIndex;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _wishlist["default"].findOne({
              userId: data.userId
            });

          case 3:
            wishList = _context2.sent;

            if (!wishList) {
              _context2.next = 13;
              break;
            }

            itemIndex = wishList.book.findIndex(function (p) {
              return p.bookId == data.bookId;
            });

            if (!(itemIndex >= 0)) {
              _context2.next = 12;
              break;
            }

            _context2.next = 9;
            return _wishlist["default"].updateOne({
              userId: data.userId
            }, {
              $pull: {
                book: {
                  bookId: data.bookId
                }
              }
            });

          case 9:
            return _context2.abrupt("return", true);

          case 12:
            return _context2.abrupt("return", false);

          case 13:
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", _context2.t0);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 15]]);
  }));

  return function removeBook(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.removeBook = removeBook;