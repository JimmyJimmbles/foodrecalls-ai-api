import logger from '../logger';

// Log missing routes
const missingRoute = (req, res) => {
  const reqStr = `${req.method} ${req.url}`;
  logger.warn(`missing-route: ${reqStr}`);
  res.status(404).send({ error: `No route found for ${reqStr}` });
};

export default missingRoute;
