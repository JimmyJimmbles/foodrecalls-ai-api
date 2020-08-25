// Importing data models
import db from '../../../../models';
import { modelByField } from '../../../../dataloaders';
import { UserSafeError } from '../../../../errors';
import { setTokens } from '../../../../auth';
import bcrypt from 'bcrypt';

const User = db.users;

const loginUser = async (root, { input }) => {
  const userByEmail = modelByField(User, 'email');
  const theUser = await userByEmail
    .load(input.email)
    .then((res) => res.toJSON());

  if (!theUser) throw new UserSafeError('Unable to Login. User not found.');

  const pwdMatch = bcrypt.compareSync(input.password, theUser.password);

  if (!pwdMatch)
    throw new UserSafeError('Unable to Login. Password is incorrect.');

  return setTokens(theUser);
};

export default loginUser;
