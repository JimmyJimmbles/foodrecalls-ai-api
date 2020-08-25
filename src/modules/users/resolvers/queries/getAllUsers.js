import { GET_ALL_USERS } from '../../providers';

/**
 * Query of all the Users.
 *
 * @param {string} root
 * @param {object} args
 * @param {object} injector
 */
const getAllUsers = (
  root,
  { limit, offset, sortBy, sortDirection },
  { injector }
) =>
  injector.get(GET_ALL_USERS).load({
    limit,
    offset,
    sortBy,
    sortDirection,
  });

export default getAllUsers;
