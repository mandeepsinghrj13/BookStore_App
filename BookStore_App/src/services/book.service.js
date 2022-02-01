import User from '../models/book.model';

//create addBook
export const addBook = (body, callback) => {
  User.create(body, (error, data) => {
    if (data) {
      return callback(null, data);
    } else {
      return callback(error, null);
    }
  });
};

//get all Book
export const allBook = (callback) => {
  User.find((error, data) => {
    if (data) {
      return callback(null, data);
    } else {
      return callback(error, null);
    }
  });
};

//get single Employee by Id
export const getBook = async (BookId) => {
  try {
    return await User.findById(BookId);
  } catch (error) {
    return error;
  }
};
