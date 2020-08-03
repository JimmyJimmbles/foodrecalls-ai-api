// Vendors
import '@babel/polyfill';
import 'graphql-import-node';
import blocked from 'blocked';
import express from 'express';

// Components
import { cors, healthCheck, requestLogger, version } from './express';
import logger from './logger';
import RequestContext from './RequestContext';

// Creates the API server
const server = async () => {
  // Check if the event loop is blocked, and log a warning message
  blocked((ms) => logger.warn(`event-loop-blocked: ${ms}ms`));

  // Instantiate express app
  const app = express();

  // Get heath check to make sure server is online
  app.get('/api/_health', healthCheck);

  // Set up the request context
  app.use(RequestContext.setup);

  // Set up the Request Logger
  app.use(requestLogger);

  // Get the current API version
  app.get('/api/_version', version);

  // Set up the CORS of the API
  app.use(cors);

  const port = process.env.API_PORT || 5000;

  // Begin listening to server requests
  app.listen(port, () =>
    logger.info(`server started on http://localhost:${port}`)
  );
};

export default server;
