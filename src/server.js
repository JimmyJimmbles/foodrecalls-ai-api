import '@babel/polyfill';
import 'graphql-import-node';
import blocked from 'blocked';
import express from 'express';

// HTTP SERVER
import { cors, healthCheck, version } from './express';
import RequestContext from './RequestContext';

// Creates the API server
const server = async () => {
  // Instantiate express app
  const app = express();

  // Get heath check to make sure server is online
  app.get('/api/_health', healthCheck);

  // Set up the request context
  app.use(RequestContext.setup);

  // Get the current API version
  app.get('/api/_version', version);

  // Set up the CORS of the API
  app.use(cors);

  const port = process.env.API_PORT || 5000;

  // Begin listening to server requests
  app.listen(port);
};

export default server;
