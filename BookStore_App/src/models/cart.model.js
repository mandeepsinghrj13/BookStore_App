import { Schema, model } from 'mongoose';

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Registration'
    },
    book: [
      {
        bookId: {
          type: Schema.Types.ObjectId,
          ref: 'Books'
        },
        quantity: {
          type: Number
        },
        total: {
          type: Number
        }
      }
    ],
    totalPrice: {
      type: Number
    },
    isPurchased: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

export default model('Carts', cartSchema);
