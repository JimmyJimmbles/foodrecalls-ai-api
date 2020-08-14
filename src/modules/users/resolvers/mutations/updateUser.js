// Importing data models
import { User } from '../../../../models';

const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const updateUser = async (root, { id, updatedAt, input }) => {
  const password = bcrypt.hashSync(input.password, salt);
  const updatedUser = {
    id,
    ...input,
    updatedAt,
    password,
  };

  return await User.update(updatedUser, { where: { id: id } }).then((res) => {
    if (res) {
      return updatedUser;
    }
  });
};

export default updateUser;
