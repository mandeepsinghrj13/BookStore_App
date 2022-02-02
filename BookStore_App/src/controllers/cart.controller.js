import * as UserService from '../services/cart.service';

export const addToCart = async (req, res) => {
  try {
    const userInfo = {
      userId: req.user.id,
      bookId: req.params.bookId,
      quantity: req.body.quantity
    };
    console.log(userInfo, 'userInfo in controller');
    const data = await UserService.addToCart(userInfo);
    if (data == true) {
      res.status(200).json({
        message: 'book add into card'
      });
    } else if (data == 'Book qty Update') {
      res.status(200).json({
        message: 'Book Quantity Update'
      });
    } else if (data == 'Book Not Found') {
      res.status(404).json({
        message: 'Book Not Found'
      });
    } else if (data == 'Book Quantity Is Less') {
      res.status(404).json({
        message: 'Please Enter Less Quantity'
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      success: false
    });
  }
};
