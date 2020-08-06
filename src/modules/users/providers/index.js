import { ProviderScope } from '@graphql-modules/di';

import { modelById,  } from '../../../dataloaders';
import db from '../../../models';

export const GET_USER_BY_ID = Symbol('GET_USER_BY_ID');

const providers = [
  {
    provide: GET_USER_BY_ID,
    scope: ProviderScope.Session,
    useFactory: () => modelById(db.users),
  },
];

export default providers;