// Vendors
import serializeError from 'serialize-error';

// Logger
import logger from '../logger';

// Log request errors
const error = (err, req, res) => {
  const requestStr = `${req.method} ${req.url}`;
  logger.error(`unhandled-error: ${requestStr}`, {
    error: serializeError(err),
  });
  res.status(500).send({ error: 'An unexpected error occurred' });
};

export default error;
