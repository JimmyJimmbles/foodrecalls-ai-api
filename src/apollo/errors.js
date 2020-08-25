import serializeError from 'serialize-error';

import { UserSafeError } from '../errors';
import logger from '../logger';

const isClientError = (error) => error instanceof UserSafeError;

const formatError = (err) => {
  const originalError = err.originalError || err;

  const logError = (level, error) => {
    logger[level](`graphql-error: ${error.message}`, {
      error: serializeError(error),
    });
  };

  if (isClientError(originalError)) {
    logError('warn', originalError);

    return originalError;
  }

  logError('error', originalError);

  if (process.env.API_RETURN_ERRORS === 'true') {
    logger.warn('Returning hidden error to user');
    return originalError;
  }

  return {
    ...serializeError(originalError),
    extensions: undefined,
    message: 'An unexpected error occurred. Please try again.',
  };
};

export default formatError;
