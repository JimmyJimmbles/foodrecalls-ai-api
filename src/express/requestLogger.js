import convertHrtime from 'convert-hrtime';

const requestLogger = (req, res, next) => {
  next();
};

export default requestLogger;
