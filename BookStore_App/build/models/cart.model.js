"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var cartSchema = new _mongoose.Schema({
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Registration'
  },
  book: [{
    bookId: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: 'Books'
    },
    quantity: {
      type: Number
    }
  }],
  isPurchased: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Carts', cartSchema);

exports["default"] = _default;