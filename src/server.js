// Vendors
import '@babel/polyfill';
import blocked from 'blocked';
import express from 'express';
import 'graphql-import-node';

// Components
import { apolloServer } from './apollo';
import {
  cors,
  healthCheck,
  requestLogger,
  version,
  missingRoute,
  error,
} from './express';
import logger from './logger';
import RequestContext from './RequestContext';

// Creates the API server
const server = async () => {
  // Check if the event loop is blocked, and log a warning message
  blocked((ms) => logger.warn(`event-loop-blocked: ${ms}ms`));

  // Instantiate express app
  const app = express();

  // Get heath check to make sure server is online
  app.get('/_health', healthCheck);

  // Set up the request context
  app.use(RequestContext.setup);

  // Set up the Request Logger
  app.use(requestLogger);

  // Get the current API version
  app.get('/_version', version);

  // Set up the CORS of the API
  app.use(cors);

  // Set up Apollo server
  const apollo = apolloServer();
  apollo.applyMiddleware({ app, cors: false });

  // Set up Missing Routes logs
  app.use(missingRoute);

  // Set up request errors logs
  app.use(error);

  // Begin listening to server requests
  const port = process.env.API_PORT || 5000;
  app.listen(port, () =>
    logger.info(`server started on http://localhost:${port}`)
  );
};

export default server;
