import { GraphQLModule } from '@graphql-modules/core';

import resolvers from './resolvers';
import * as typeDefs from './schema.graphql';
import Types from '../types';

const Authentication = new GraphQLModule({
  imports: [Types],
  resolvers,
  typeDefs,
});

export default Authentication;
