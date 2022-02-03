"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var wishlistSchema = new _mongoose.Schema({
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Registration'
  },
  book: [{
    bookId: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: 'Books'
    },
    title: {
      type: String
    }
  }]
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Wishlist', wishlistSchema);

exports["default"] = _default;