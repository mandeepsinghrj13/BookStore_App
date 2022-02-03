"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = require("../utils/user.util");

var bookController = _interopRequireWildcard(require("../controllers/book.controller"));

var _auth = require("../middlewares/auth.middleware");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = _express["default"].Router(); //route to create a new user addbook


router.post('/book', _auth.userAuth, _user.verifyRole, _user.upload.single('bookImage'), bookController.addBook); //route to get all Book

router.get('/book', _auth.userAuth, bookController.allBook); //route to get a single Book by their Bookid

router.get('/book/:BookId', _auth.userAuth, bookController.getBook); //route to update a single Book by their Bookid

router.put('/book/:BookId', _auth.userAuth, bookController.updateBook); //route to delete a single Book by their Bookid

router["delete"]('/book/:BookId', _auth.userAuth, _user.verifyRole, bookController.deleteBook); //route to get search Title

router.get('/search/:title', _auth.userAuth, bookController.serchTitle);
var _default = router;
exports["default"] = _default;