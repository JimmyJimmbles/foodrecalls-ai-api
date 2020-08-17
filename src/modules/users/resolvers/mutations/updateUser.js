// Importing data models
import db from '../../../../models';

import { UserSafeError } from '../../../../errors';

const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const updateUser = async (root, { uuid, input }) => {
  const password = bcrypt.hashSync(input.password, salt);
  const updatedUser = {
    uuid,
    ...input,
    password,
  };

  return await db.users
    .update(updatedUser, { where: { uuid: uuid } })
    .then((res) => {
      if (res) {
        return updatedUser;
      }
    })
    .catch((err) => {
      throw new UserSafeError(err);
    });
};

export default updateUser;
