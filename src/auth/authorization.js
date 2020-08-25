import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import { modelById } from '../dataloaders';
import db from '../models';

const User = db.users;

// Secure authorization requests
export const secure = (func, admin = false) => async (root, args, context) => {
  if (!context.user) throw new AuthenticationError('Unauthenticated.');

  const userByID = modelById(User);
  const theUser = await userByID.load(context.user.id);

  // admin only
  if (admin && (!theUser || theUser.role !== 'admin'))
    throw new ForbiddenError('Unauthorized');

  return func(root, args, context);
};
