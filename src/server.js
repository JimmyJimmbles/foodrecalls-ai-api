import '@babel/polyfill';
import 'graphql-import-node';

// HTTP SERVER
import express from 'express';
import { cors } from './express';

const app = express();

const setPort = (port = 5000) => {
  app.set('port', parseInt(port, 10));
};

const listen = () => {
  const port = app.get('port') || 5000;
  app.listen(port, () => {
    console.log(
      `The server is running and listening at http://localhost:${port}`
    );
  });
};

app.use(cors);

// Endpoint to check if the API is running
app.get('/api/status', (req, res) => {
  res.send({ status: 'ok' });
});

export default {
  getApp: () => app,
  setPort,
  listen,
};
