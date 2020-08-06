// Vendors
import { ApolloServer } from 'apollo-server-express';

import AppModule from '../modules';

const apolloServer = () => {
  const { schema, context } = AppModule;

  return new ApolloServer({
    context: ({ req, res }) => ({ ...context, req, res }),
    playground: process.env.API_ENABLE_PLAYGROUND === 'true',
    schema,
  });
};

export default apolloServer;
