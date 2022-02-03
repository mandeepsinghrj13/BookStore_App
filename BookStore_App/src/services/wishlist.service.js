import wishlist from '../models/wishlist.model';
import Book from '../models/book.model';

//Add To Wishlist
export const addToWish = async (info) => {
  try {
    const available = await Book.findOne({ _id: info.bookId });
    if (available) {
      const addwishlist = await wishlist.findOne({ userId: info.userId });
      if (!addwishlist) {
        const data = new wishlist({
          userId: info.userId,
          book: [
            {
              bookId: info.bookId,
              title: available.title
            }
          ]
        });
        data.save();
        return true;
      } else {
        const bookpresent = await wishlist.findOne({ userId: info.userId, 'book.bookId': info.bookId });
        if (bookpresent == null) {
          const newbook = {
            bookId: info.bookId,
            title: available.title
          };
          await wishlist.findOneAndUpdate({ userId: info.userId }, { $push: { book: newbook } });
          return true;
        } else {
          return 'Book Already Present';
        }
      }
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};
