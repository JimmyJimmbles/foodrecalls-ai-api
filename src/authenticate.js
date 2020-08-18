require('dotenv').config();

import jwt from 'jsonwebtoken';

const authenticate = (req, requireAuth = true) => {
  const header = req.req.headers.authorization;

  if (header) {
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded;
  }

  if (requireAuth) {
    throw new Error('You must be logged in to access this page.');
  }

  return null;
};

export default authenticate;
