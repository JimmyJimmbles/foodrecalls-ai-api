import getUser from './getUser';
import getAllUsers from './getAllUsers';

const resolvers = {
  Query: {
    getUser,
    getAllUsers,
  },
};

export default resolvers;
