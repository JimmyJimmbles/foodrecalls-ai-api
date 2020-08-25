import { GraphQLScalarType, Kind } from 'graphql';

import { UserSafeError } from '../../../errors';

const validateCount = (value) => {
  if (value === null) {
    return value;
  }

  if (!['string', 'number'].includes(typeof value)) {
    throw new UserSafeError('Count value must be an integer');
  }

  const number = Number(value);
  if (Number.isSafeInteger(number) && number >= 0) {
    return number;
  }

  throw new UserSafeError(`Invalid count value ${value}`);
};

const Count = new GraphQLScalarType({
  name: 'Count',
  description: 'A positive integer',
  parseValue: validateCount,
  serialize: validateCount,
  parseLiteral: (ast) => {
    if (ast.kind === Kind.INT) {
      return validateCount(ast.value);
    }

    throw new UserSafeError('Count value must be an integer');
  },
});

export default Count;
