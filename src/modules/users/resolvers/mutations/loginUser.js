require('dotenv').config();

// Importing data models
import db from '../../../../models';
import { v4 as uuidv4 } from 'uuid';
import { jwt } from 'jsonwebtoken';
import { UserSafeError } from '../../../../errors';

const User = db.users;

const loginUser = async (root, { input }) => {
  const theUser = await User.findAll({
    where: { email: input.email },
  });

  if (!theUser) throw new UserSafeError('Unable to Login. Email not found.');

  const pwdMatch = bcrypt.compareSync(input.password, theUser.password);

  if (!theUser)
    throw new UserSafeError('Unable to Login. Password is incorrect.');

  return { ...theUser, token: jwt.sign(theUser, process.env.JWT_SECRET) };
};

export default loginUser;
