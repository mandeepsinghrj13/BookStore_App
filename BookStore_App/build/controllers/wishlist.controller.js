"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeBook = exports.addToWish = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var WishlistService = _interopRequireWildcard(require("../services/wishlist.service"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Controller to AddToWishlist
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
var addToWish = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var info, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            info = {
              userId: req.user.id,
              bookId: req.params.bookId
            };
            _context.next = 4;
            return WishlistService.addToWish(info);

          case 4:
            data = _context.sent;

            if (data == true) {
              res.status(_httpStatusCodes["default"].OK).json({
                code: _httpStatusCodes["default"].OK,
                message: 'Book Added Into wishlist Successfully'
              });
            } else if (data == 'Book Already Present') {
              res.status(_httpStatusCodes["default"].CONFLICT).json({
                code: _httpStatusCodes["default"].CONFLICT,
                message: 'Book Already Into wishlist'
              });
            } else {
              res.status(_httpStatusCodes["default"].NOT_FOUND).json({
                code: _httpStatusCodes["default"].NOT_FOUND,
                message: 'Book Not Found'
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

  return function addToWish(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Controller to RemoveBookIntoWishlist
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.addToWish = addToWish;

var removeBook = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var id, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = {
              userId: req.user.id,
              bookId: req.params.bookId
            };
            _context2.next = 4;
            return WishlistService.removeBook(id);

          case 4:
            data = _context2.sent;

            if (!data) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(_httpStatusCodes["default"].OK).json({
              code: _httpStatusCodes["default"].OK,
              message: 'Book Removed From Wishlist Successfully'
            }));

          case 9:
            return _context2.abrupt("return", res.status(_httpStatusCodes["default"].NOT_FOUND).json({
              code: _httpStatusCodes["default"].NOT_FOUND,
              message: 'Book Not Found In Wishlist'
            }));

          case 10:
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12]]);
  }));

  return function removeBook(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.removeBook = removeBook;