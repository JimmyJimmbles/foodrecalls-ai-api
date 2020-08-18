require('dotenv').config();

// Importing data models
import db from '../../../../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserSafeError } from '../../../../errors';
import { modelByField } from '../../../../dataloaders';

const User = db.users;

const loginUser = async (root, { input }) => {
  const userByEmail = modelByField(User, 'email');
  let theUser = await userByEmail.load(input.email);

  if (!theUser) throw new UserSafeError('Unable to Login. Email not found.');

  // Set user to json object
  theUser = theUser.toJSON();

  const pwdMatch = bcrypt.compareSync(input.password, theUser.password);

  if (!pwdMatch)
    throw new UserSafeError('Unable to Login. Password is incorrect.');

  return { token: jwt.sign(theUser, process.env.JWT_SECRET) };
};

export default loginUser;
