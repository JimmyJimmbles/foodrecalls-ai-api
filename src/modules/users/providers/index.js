import { ProviderScope } from '@graphql-modules/di';

import {
  modelById,
  collectionByQuery,
  paginatedCollection,
} from '../../../dataloaders';
import { User } from '../../../models';

export const GET_ALL_USERS = Symbol('GET_ALL_USERS');
export const GET_USER_BY_ID = Symbol('GET_USER_BY_ID');
export const GET_USERS_BY_QUERY = Symbol('GET_USERS_BY_QUERY');

const providers = [
  {
    provide: GET_ALL_USERS,
    scope: ProviderScope.Session,
    useFactory: () => paginatedCollection(User),
  },
  {
    provide: GET_USER_BY_ID,
    scope: ProviderScope.Session,
    useFactory: () => modelById(User),
  },
  {
    provide: GET_USERS_BY_QUERY,
    scope: ProviderScope.Session,
    useFactory: () => collectionByQuery(User),
  },
];

export default providers;
