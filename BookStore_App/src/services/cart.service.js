import Cart from '../models/cart.model';
import Book from '../models/book.model';

export const addToCart = async (userInfo) => {
  try {
    if (userInfo.quantity == 0) {
      return 'Zero';
    } else {
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
                  quantity: userInfo.quantity,
                  total: userInfo.quantity * available.price
                }
              ],
              totalPrice: userInfo.quantity * available.price
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
                quantity: userInfo.quantity,
                total: userInfo.quantity * available.price
              };
              await Cart.findOneAndUpdate({ userId: userInfo.userId }, { $push: { book: newbook } });
              const newcart = await Cart.findOne({ userId: userInfo.userId });
              const totalPrice = newcart.book.map((books) => books.total).reduce((acc, curr) => acc + curr);
              await Cart.findOneAndUpdate({ userId: userInfo.userId }, { totalPrice: totalPrice });
              return true;
            } else {
              return 'Book Quantity Is Less';
            }
          } else {
            if (available.quantity >= userInfo.quantity) {
              const index = bookpresent.book.findIndex((item) => item.bookId == userInfo.bookId);
              const qty = bookpresent.book[index].quantity + userInfo.quantity;
              const newbook = {
                bookId: bookpresent.book[index].bookId,
                quantity: qty,
                total: qty * available.price
              };
              await Cart.updateOne({ userId: userInfo.userId }, { $pull: { book: bookpresent.book[index] } });
              await Cart.findOneAndUpdate({ userId: userInfo.userId }, { $push: { book: newbook } });
              const newcart = await Cart.findOne({ userId: userInfo.userId });
              const totalPrice = newcart.book.map((books) => books.total).reduce((acc, curr) => acc + curr);
              await Cart.findOneAndUpdate({ userId: userInfo.userId }, { totalPrice: totalPrice });
              return 'Book qty Update';
            } else {
              return 'Book Quantity Is Less';
            }
          }
        }
      } else {
        return 'Book Not Found';
      }
    }
  } catch (error) {
    return error;
  }
};

//get All Carts
export const getAllCarts = (callback) => {
  Cart.find((error, data) => {
    if (data) {
      return callback(null, data);
    } else {
      return callback(error, null);
    }
  });
};

//get a Cart
export const getCart = async (info) => {
  try {
    const cart = await Cart.findOne({ userId: info.userId });
    if (cart) {
      const book = cart.book.length;
      if (book == 0) {
        return 'Cart Is Empty';
      } else {
        return cart;
      }
    } else {
      return 'Cart Not Found';
    }
  } catch (error) {
    return error;
  }
};

//put Order Place
export const placeOrder = async (info) => {
  try {
    const cart = await Cart.findOne({ userId: info.userId });
    if (cart) {
      const book = cart.book.length;
      if (book == 0) {
        return 'Cart Is Empty';
      } else if (cart.isPurchased == false) {
        await Cart.findOneAndUpdate({ userId: info.userId }, { isPurchased: info.isPurchased }, { new: true });
        return true;
      } else {
        await Cart.findOneAndUpdate({ userId: info.userId }, { isPurchased: info.isPurchased }, { new: true });
        return false;
      }
    } else {
      return 'Cart Not Found';
    }
  } catch (error) {
    return error;
  }
};

export const removeBookFromCart = async (data) => {
  try {
    let cart = await Cart.findOne({ userId: data.userId });
    if (cart) {
      let itemIndex = cart.book.findIndex((p) => p.bookId == data.bookId);
      if (itemIndex >= 1) {
        await Cart.updateOne({ userId: data.userId }, { $pull: { book: { bookId: data.bookId } } });
        return true;
      } else {
        return false;
      }
    }
  } catch (err) {
    return err;
  }
};
