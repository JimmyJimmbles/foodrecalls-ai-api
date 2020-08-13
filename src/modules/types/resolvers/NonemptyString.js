import { GraphQLScalarType, Kind } from 'graphql';

import { UserSafeError } from '../../../errors';

const validateString = (value) => {
  if (value === null) {
    return value;
  }

  if (typeof value !== 'string') {
    throw new UserSafeError('NonemptyString value must be a string');
  }

  const trimmed = value.trim();
  if (trimmed.length > 0) {
    return trimmed;
  }

  throw new UserSafeError(`Invalid nonempty string ${value}`);
};

const NonemptyString = new GraphQLScalarType({
  name: 'NonemptyString',
  description: 'A standard string, but trimmed of whitespace and cannot be empty',
  parseValue: validateString,
  serialize: validateString,
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) {
      return validateString(ast.value);
    }

    throw new UserSafeError('NonemptyString value must be a string');
  },
});

export default NonemptyString;
