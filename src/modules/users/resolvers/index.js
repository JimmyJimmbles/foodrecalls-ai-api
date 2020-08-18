// Queries
import getUser from './queries/getUser';
import getAllUsers from './queries/getAllUsers';

// Mutations
import loginUser from './mutations/loginUser';
import createUser from './mutations/createUser';
import updateUser from './mutations/updateUser';

const resolvers = {
  Query: {
    getUser,
    getAllUsers,
  },
  Mutation: {
    loginUser,
    createUser,
    updateUser,
  },
};

export default resolvers;
