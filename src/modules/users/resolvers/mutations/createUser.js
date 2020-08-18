require('dotenv').config();

// Importing data models
import db from '../../../../models';
import { v4 as uuidv4 } from 'uuid';
import { jwt } from 'jsonwebtoken';

const User = db.users;

const createUser = async (root, { input }) => {
  const uuid = uuidv4();
  const password = User.generateHash(input.password);
  const newUser = await User.create({ uuid, ...input, password });

  return { ...newUser, token: jwt.sign(newUser, process.env.JWT_SECRET) };
};

export default createUser;
