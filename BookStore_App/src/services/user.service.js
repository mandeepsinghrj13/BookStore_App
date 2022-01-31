import User from '../models/user.model';
import bcrypt from 'bcrypt';

//create new user registration
export const register = async (info) => {
  const findemail = await User.find({ email: info.email });
  if (findemail.length === 0) {
    const hashing = await bcrypt.hash(info.password, 10);
    info.password = hashing;
    const data = await User.create(info);
    return data;
  } else {
    return null;
  }
};
