import convertHrtime from 'convert-hrtime';

import logger from '../logger';

class LogExtension {
  handleStep(level, step, messagePieces = []) {
    const startTime = process.hrtime();

    logger[level](
      [`${step}-start:`, ...messagePieces].filter((m) => m).join(' ')
    );

    return () => {
      const elapsed = convertHrtime(process.hrtime(startTime)).milliseconds;

      logger[level](
        [`${step}-end:`, ...messagePieces, `[${elapsed}ms]`]
          .filter((m) => m)
          .join(' ')
      );
    };
  }

  requestDidStart({ operationName }) {
    return this.handleStep('info', 'graphql-request', [operationName]);
  }

  parsingDidStart() {
    return this.handleStep('debug', 'graphql-parsing');
  }

  validationDidStart() {
    return this.handleStep('debug', 'graphql-validation');
  }

  executionDidStart() {
    return this.handleStep('debug', 'graphql-execution');
  }
}

export default LogExtension;
