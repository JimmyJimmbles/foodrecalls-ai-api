// Importing data models
import db from '../../../../models';
import { UserSafeError } from '../../../../errors';

const User = db.users;

const updateUser = async (root, { uuid, input }) => {
  const password = User.generateHash(input.password);
  const updatedUserData = {
    uuid,
    ...input,
    password,
  };

  return await User.update(updatedUserData, { where: { uuid: uuid } })
    .then((res) => {
      if (res) {
        return updatedUserData;
      }
    })
    .catch((err) => {
      throw new UserSafeError(err);
    });
};

export default updateUser;
