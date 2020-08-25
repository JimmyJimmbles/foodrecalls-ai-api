import { secure } from '../../../auth/authorization';

// Queries
import authenticatedUser from './queries/authenticatedUser';
import getUser from './queries/getUser';
import getAllUsers from './queries/getAllUsers';

// Mutations
import createUser from './mutations/createUser';
import updateUser from './mutations/updateUser';

const resolvers = {
  Query: {
    authenticatedUser,
    getUser: secure(getUser, true),
    getAllUsers: secure(getAllUsers),
  },
  Mutation: {
    createUser: secure(createUser, true),
    updateUser: secure(updateUser),
  },
};

export default resolvers;
