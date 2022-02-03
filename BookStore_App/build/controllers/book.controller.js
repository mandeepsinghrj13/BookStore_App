"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBook = exports.serchTitle = exports.getBook = exports.deleteBook = exports.allBook = exports.addBook = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var UserService = _interopRequireWildcard(require("../services/book.service"));

var _logger = _interopRequireDefault(require("../config/logger"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Controller to Add Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
var addBook = function addBook(req, res, next) {
  try {
    var body = {
      bookImage: req.file.path,
      author: req.body.author,
      title: req.body.title,
      quantity: req.body.quantity,
      price: req.body.price,
      description: req.body.description
    };
    UserService.addBook(body, function (error, data) {
      if (data) {
        _logger["default"].info('Book Inserted Successfully');

        res.status(_httpStatusCodes["default"].CREATED).send({
          code: _httpStatusCodes["default"].CREATED,
          message: 'Book Inserted Successfully',
          data: data
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Controller to get all Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.addBook = addBook;

var allBook = function allBook(req, res, next) {
  try {
    UserService.allBook(function (error, data) {
      if (data) {
        _logger["default"].info('Geting All Book Successfully');

        res.status(_httpStatusCodes["default"].OK).json({
          code: _httpStatusCodes["default"].OK,
          message: 'Geting All Book Successfully',
          data: data
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Controller to get a single Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.allBook = allBook;

var getBook = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return UserService.getBook(req.params.BookId);

          case 3:
            data = _context.sent;

            if (data == null) {
              _logger["default"].error('Id Not Found');

              res.status(_httpStatusCodes["default"].NOT_FOUND).json({
                code: _httpStatusCodes["default"].NOT_FOUND,
                message: 'Id Not Found'
              });
            } else {
              _logger["default"].info('Book fetched successfully');

              res.status(_httpStatusCodes["default"].OK).json({
                code: _httpStatusCodes["default"].OK,
                message: 'Book fetched successfully',
                data: data
              });
            }

            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function getBook(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Controller to update a Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.getBook = getBook;

var updateBook = function updateBook(req, res, next) {
  try {
    UserService.updateBook(req.params.BookId, req.body).then(function (data) {
      _logger["default"].info('Book updated successfully');

      res.status(_httpStatusCodes["default"].OK).json({
        code: _httpStatusCodes["default"].OK,
        message: 'Book updated successfully',
        data: data
      });
    })["catch"](function () {
      _logger["default"].error('BookId Not Found');

      return res.status(_httpStatusCodes["default"].NOT_FOUND).json({
        code: _httpStatusCodes["default"].NOT_FOUND,
        message: 'BookId Not Found'
      });
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Controller to delete a Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.updateBook = updateBook;

var deleteBook = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return UserService.deleteBook(req.params.BookId);

          case 3:
            data = _context2.sent;

            if (!(data == null)) {
              _context2.next = 7;
              break;
            }

            _logger["default"].error('Id Not Found');

            return _context2.abrupt("return", res.status(_httpStatusCodes["default"].NOT_FOUND).json({
              code: _httpStatusCodes["default"].NOT_FOUND,
              message: 'Id Not Found'
            }));

          case 7:
            _logger["default"].info('Book deleted successfully');

            res.status(_httpStatusCodes["default"].OK).json({
              code: _httpStatusCodes["default"].OK,
              message: 'Book deleted successfully',
              data: data
            });
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));

  return function deleteBook(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Controller to get Book by title
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.deleteBook = deleteBook;

var serchTitle = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return UserService.serchTitle(req.params.title);

          case 3:
            data = _context3.sent;

            if (data.length !== 0) {
              _logger["default"].info('Title Fetched Successfully');

              res.status(_httpStatusCodes["default"].OK).json({
                code: _httpStatusCodes["default"].OK,
                message: 'Title Fetched Successfully',
                data: data
              });
            } else {
              _logger["default"].error('Title Not Found');

              res.status(_httpStatusCodes["default"].NOT_FOUND).json({
                code: _httpStatusCodes["default"].NOT_FOUND,
                message: 'Title Not Found'
              });
            }

            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            next(_context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function serchTitle(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.serchTitle = serchTitle;