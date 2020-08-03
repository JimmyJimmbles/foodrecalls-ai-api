// Vendors
import safe from 'colors/safe';
import partition from 'lodash/partition';
import pick from 'lodash/pick';
import { createLogger, format, transports } from 'winston';

// Components
import RequestContext from './RequestContext';

// Create logger to keep track of requests
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format,
  transports: [new transports.Console()],
});

const log = (level, message, ...meta) => {
  const [objectMeta, rest] = partition(meta, (arg) => typeof arg === 'object');
  const combinedMessage = [message, ...rest].join(' ');

  // Current Context of the Request
  const context = RequestContext.current();

  logger.log(level, combinedMessage, {
    ...objectMeta,
    ...pick(context, ['basRequestId', 'parentRequestId', 'requestId']),
  });

  return logger;
};

export default {
  silly: (...args) => log('silly', ...args),
  debug: (...args) => log('debug', ...args),
  verbose: (...args) => log('verbose', ...args),
  info: (...args) => log('info', ...args),
  warn: (...args) => log('warn', ...args),
  error: (...args) => log('error', ...args),
};
