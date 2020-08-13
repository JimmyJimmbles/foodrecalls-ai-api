// Vendors
import { GraphQLModule } from '@graphql-modules/core';

import providers from './providers';
import resolvers from './resolvers';
import * as typeDefs from './schema.graphql';
import Types from '../types';

// Instantiating the Users GraphQLModule to set up all the User queries
const Users = new GraphQLModule({
  imports: [Types],
  providers,
  resolvers,
  typeDefs,
});

export default Users;
