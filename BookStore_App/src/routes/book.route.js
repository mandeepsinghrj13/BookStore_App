import express from 'express';
import { verifyRole, upload } from '../utils/user.util';
import * as bookController from '../controllers/book.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user addbook
router.post('/book', userAuth, verifyRole, upload.single('bookImage'), bookController.addBook);

//route to get all Book
router.get('/book', userAuth, bookController.allBook);

//route to get a single Book by their Bookid
router.get('/book/:BookId', userAuth, bookController.getBook);

//route to update a single Book by their Bookid
router.put('/book/:BookId', userAuth, bookController.updateBook);

//route to delete a single Book by their Bookid
router.delete('/book/:BookId', userAuth, verifyRole, bookController.deleteBook);

//route to get search Title
router.get('/search/:title', userAuth, bookController.serchTitle);

export default router;
