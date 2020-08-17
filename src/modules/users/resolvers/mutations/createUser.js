// Importing data models
import db from '../../../../models';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const createUser = async (root, { input }) => {
  const uuid = uuidv4();
  const password = bcrypt.hashSync(input.password, salt);

  return db.users.create({ uuid, ...input, password });
};

export default createUser;
