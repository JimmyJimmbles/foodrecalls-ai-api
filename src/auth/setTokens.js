import { sign } from 'jsonwebtoken';

const setTokens = ({ id }) => {
  const secretKeyAccess = process.env.JWT_SECRET_ACCESS;
  const fifteenMins = 60 * 15 * 1000;

  const token = sign({ id, loggedIn: true }, secretKeyAccess, {
    expiresIn: fifteenMins,
  });

  return { token };
};

export default setTokens;
