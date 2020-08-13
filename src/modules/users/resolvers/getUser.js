import { GET_USER_BY_ID } from '../providers';

/**
 * Query User
 *
 * @param {string} root
 * @param {object} id
 * @param {object} injector
 */

const getUser = (root, { id }, { injector }) =>
  injector.get(GET_USER_BY_ID).load(id);

export default getUser;
