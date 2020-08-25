import { GraphQLModule } from '@graphql-modules/core';

// Modules
import Authentication from './authentication';
import Users from './users';

// App Module to import all Modules for the App
const AppModule = new GraphQLModule({
  imports: [Authentication, Users],
});

export default AppModule;
