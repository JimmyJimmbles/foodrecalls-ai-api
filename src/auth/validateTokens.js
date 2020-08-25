import { verify } from 'jsonwebtoken';
import { UserSafeError } from '../errors';

const validateTokens = (header) => {
  if (!header) return null;

  try {
    const secretKey = process.env.JWT_SECRET_ACCESS;
    const token = header.replace('Bearer ', '');

    return verify(token, secretKey);
  } catch {
    throw new UserSafeError('Unable to Validate tokens.');
  }
};

export default validateTokens;
