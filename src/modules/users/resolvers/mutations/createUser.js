// Importing data models
import db from '../../../../models';
import { v4 as uuidv4 } from 'uuid';

const User = db.users;

const createUser = async (root, { input }) => {
  const uuid = uuidv4();
  const password = User.generateHash(input.password);

  return await User.create({ uuid, ...input, password });
};

export default createUser;
