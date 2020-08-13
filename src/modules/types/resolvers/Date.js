import { GraphQLScalarType, Kind } from 'graphql';

import { UserSafeError } from '../../../errors';

const Date = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.getTime();
  },
  parseLiteral: (ast) => {
    if (ast.kind === Kind.INT) {
      return validateDate(ast.value);
    }

    throw new UserSafeError('Date value must be a valid date');
  },
});

export default Date;
