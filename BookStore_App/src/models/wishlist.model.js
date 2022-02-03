import { Schema, model } from 'mongoose';

const wishlistSchema = new Schema(
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
        title: {
          type: String
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model('Wishlist', wishlistSchema);
