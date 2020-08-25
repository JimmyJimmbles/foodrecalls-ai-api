import { defaultFieldResolver } from 'graphql';
import {
  SchemaDirectiveVisitor,
  AuthenticationError,
  ForbiddenError,
} from 'apollo-server-express';

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    // destructuring the `resolve` property off of `field`, while providing a default value `defaultFieldResolver` in case `field.resolve` is undefined.
    const { resolver = defaultFieldResolver, name } = field;
    const { requires } = this.args;
    const whitelistOperations = ['currentUser'];

    field.resolve = async (source, args, context, info) => {
      const {
        variableValues: { id },
      } = info;
      const operation = info.operation.selectionSet.selections[0].name.value;

      if (!whitelistOperations.includes(operation)) {
        if (!context.user) {
          throw new AuthenticationError(`Unauthenticated field ${name}`);
        }

        if (requires === 'admin' && context.user.role !== 'admin') {
          throw new ForbiddenError(`Unauthorized field ${name}`);
        }
      }

      return await resolver.call(this, source, args, context, info);
    };
  }
}

export { AuthDirective };
