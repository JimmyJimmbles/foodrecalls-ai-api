// Queries
import getUser from './queries/getUser';
import getAllUsers from './queries/getAllUsers';

// Mutations
import createUser from './mutations/createUser';

const resolvers = {
  Query: {
    getUser,
    getAllUsers,
  },
  Mutation: {
    createUser,
  },
};

export default resolvers;
