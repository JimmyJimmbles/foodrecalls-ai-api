import { GraphQLModule } from '@graphql-modules/core';

// Modules
import Users from './users';

// Set up all the GraphQL queries in one module for easy management.
const AppModule = new GraphQLModule({
  imports: [Users],
});

export default AppModule;
