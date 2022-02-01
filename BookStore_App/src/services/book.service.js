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
