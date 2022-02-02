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

//get Book by Id
export const getBook = async (BookId) => {
  try {
    return await User.findById(BookId);
  } catch (error) {
    return error;
  }
};

//update Book
export const updateBook = (_id, body) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      {
        _id
      },
      body,
      {
        new: true
      }
    )
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

//delete single Book
export const deleteBook = async (BookId) => {
  try {
    return await User.findByIdAndDelete(BookId);
  } catch (error) {
    return error;
  }
};

//get Book by title
export const serchTitle = async (title) => {
  try {
    return await User.find({ title: title });
  } catch (error) {
    return error;
  }
};
