"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBook = exports.serchTitle = exports.getBook = exports.deleteBook = exports.allBook = exports.addBook = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _book = _interopRequireDefault(require("../models/book.model"));

//create addBook
var addBook = function addBook(body, callback) {
  _book["default"].create(body, function (error, data) {
    if (data) {
      return callback(null, data);
    } else {
      return callback(error, null);
    }
  });
}; //get all Book


exports.addBook = addBook;

var allBook = function allBook(callback) {
  _book["default"].find(function (error, data) {
    if (data) {
      return callback(null, data);
    } else {
      return callback(error, null);
    }
  });
}; //get Book by Id


exports.allBook = allBook;

var getBook = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(BookId) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _book["default"].findById(BookId);

          case 3:
            return _context.abrupt("return", _context.sent);

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function getBook(_x) {
    return _ref.apply(this, arguments);
  };
}(); //update Book


exports.getBook = getBook;

var updateBook = function updateBook(_id, body) {
  return new Promise(function (resolve, reject) {
    _book["default"].findByIdAndUpdate({
      _id: _id
    }, body, {
      "new": true
    }).then(function (data) {
      return resolve(data);
    })["catch"](function (error) {
      return reject(error);
    });
  });
}; //delete single Book


exports.updateBook = updateBook;

var deleteBook = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(BookId) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _book["default"].findByIdAndDelete(BookId);

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", _context2.t0);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 6]]);
  }));

  return function deleteBook(_x2) {
    return _ref2.apply(this, arguments);
  };
}(); //get Book by title


exports.deleteBook = deleteBook;

var serchTitle = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(title) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _book["default"].find({
              title: title
            });

          case 3:
            return _context3.abrupt("return", _context3.sent);

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", _context3.t0);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 6]]);
  }));

  return function serchTitle(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.serchTitle = serchTitle;