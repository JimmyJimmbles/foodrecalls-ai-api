// Vendors
import { GraphQLModule } from '@graphql-modules/core';

import providers from './providers';
import resolvers from './resolvers';
import * as typeDefs from './schema.graphql';

const Users = new GraphQLModule({
  providers,
  resolvers,
  typeDefs,
});

export default Users;
