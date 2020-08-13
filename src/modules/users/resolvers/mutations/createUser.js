// Importing data models
import db from '../../../../models';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const createUser = async (root, { input }) => {
  const id = uuidv4();
  const { firstName, lastName, email } = input;
  const password = bcrypt.hashSync(input.password, salt);

  return db.users.create({ id, firstName, lastName, email, password });
};

export default createUser;
