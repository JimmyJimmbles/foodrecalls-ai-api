// Vendors
import { AuthenticationError } from 'apollo-server-express';
import { GraphQLModule } from '@graphql-modules/core';

import providers from './providers';
import resolvers from './resolvers';
import * as typeDefs from './schema.graphql';
import Types from '../types';
import { validateTokens } from '../../auth';

// Instantiating the Users GraphQLModule to set up all the User queries
const Users = new GraphQLModule({
  imports: [Types],
  providers,
  resolvers,
  typeDefs,
  context: ({ req }) => {
    const token = req.headers.authorization || false;
    const user = validateTokens(token);

    if (!user) throw new AuthenticationError('User must be logged in!');

    return { user };
  },
});

export default Users;
