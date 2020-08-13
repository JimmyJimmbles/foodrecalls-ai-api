import { GraphQLScalarType, Kind } from 'graphql';
import uuidValidate from 'uuid-validate';

import { UserSafeError } from '../../../errors';

const validateUuid = (value) => {
  if (value === null) {
    return value;
  }

  if (typeof value !== 'string') {
    throw new UserSafeError('Uuid value must be a string');
  }

  if (uuidValidate(value)) {
    return value;
  }

  throw new UserSafeError(`Invalid uuid value ${value}`);
};

const Uuid = new GraphQLScalarType({
  name: 'Uuid',
  description: 'A valid uuid type',
  parseValue: validateUuid,
  serialize: validateUuid,
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) {
      return validateUuid(ast.value);
    }

    throw new UserSafeError('Uuid value must be a string');
  },
});

export default Uuid;
