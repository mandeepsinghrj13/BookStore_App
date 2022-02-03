import { Schema, model } from 'mongoose';

const bookSchema = new Schema(
  {
    bookImage: {
      type: Object
    },
    author: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default model('Books', bookSchema);
