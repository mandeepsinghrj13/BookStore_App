import Cart from '../models/cart.model';
import Book from '../models/book.model';

export const addToCart = async (userInfo) => {
  try {
    const available = await Book.findOne({ _id: userInfo.bookId });
    if (available) {
      const usercart = await Cart.findOne({ userId: userInfo.userId });
      if (!usercart) {
        if (available.quantity >= userInfo.quantity) {
          const cart = new Cart({
            userId: userInfo.userId,
            book: [
              {
                bookId: userInfo.bookId,
                quantity: userInfo.quantity
              }
            ]
          });
          cart.save();
          return true;
        } else {
          return 'Book Quantity Is Less';
        }
      } else {
        const bookpresent = await Cart.findOne({ userId: userInfo.userId, 'book.bookId': userInfo.bookId });
        if (bookpresent == null) {
          if (available.quantity >= userInfo.quantity) {
            const newbook = {
              bookId: userInfo.bookId,
              quantity: userInfo.quantity
            };
            await Cart.findOneAndUpdate({ userId: userInfo.userId }, { $push: { book: newbook } });
            return true;
          } else {
            return 'Book Quantity Is Less';
          }
        } else {
          if (available.quantity >= userInfo.quantity) {
            const index = bookpresent.book.findIndex((item) => item.bookId == userInfo.bookId);
            const newbook = {
              bookId: bookpresent.book[index].bookId,
              quantity: bookpresent.book[index].quantity + userInfo.quantity
            };
            await Cart.updateOne({ userId: userInfo.userId }, { $pull: { book: bookpresent.book[index] } });
            await Cart.findOneAndUpdate({ userId: userInfo.userId }, { $push: { book: newbook } });
            return 'Book qty Update';
          } else {
            return 'Book Quantity Is Less';
          }
        }
      }
    } else {
      return 'Book Not Found';
    }
  } catch (error) {
    return error;
  }
};
