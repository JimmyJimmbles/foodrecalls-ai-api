import { AuthenticationError } from 'apollo-server-express';
import { isEmpty } from 'lodash';

// Importing data models
import db from '../../../../models';
import { modelById } from '../../../../dataloaders';

const User = db.users;

const authenticatedUser = async (root, { input }, { user }) => {
  if (isEmpty(user)) throw new AuthenticationError('Must authenticate');

  const userByID = modelById(User);
  const theUser = await userByID.load(user.id);

  if (!theUser) throw new AuthenticationError('The User Must be Authenticated');

  return theUser;
};

export default authenticatedUser;
