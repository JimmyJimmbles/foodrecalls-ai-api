// Vendors
import { ApolloServer } from 'apollo-server-express';

import AppModule from '../modules';
import formatError from './errors';
// import LogExtension from './LogExtension';
import db from '../models';

const apolloServer = () => {
  const { schema, context } = AppModule;

  return new ApolloServer({
    schema,
    formatError,
    introspection: process.env.API_ENABLE_INTROSPECTION === 'true',
    playground: process.env.API_ENABLE_PLAYGROUND === 'true',
    tracing: process.env.API_ENABLE_TRACING === 'true',
    context: ({ req, res }) => ({ ...context, req, res }),
  });
};

export default apolloServer;
