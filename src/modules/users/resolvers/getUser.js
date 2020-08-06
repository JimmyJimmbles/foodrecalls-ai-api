import { GET_USER_BY_ID } from '../providers';

const getUser = (root, { id }, { injector }) => (
    injector.get(GET_USER_BY_ID).load(id)
  );
  
  export default getUser;