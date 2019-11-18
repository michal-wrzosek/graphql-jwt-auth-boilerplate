import { Resolvers } from 'src/generated/graphql';
import { ApolloContextType } from 'src/util/context';
import { AuthenticationError } from 'apollo-server-core';
import { ERRORS_ENUM } from 'src/types/ErrorsEnum';

export const me: Resolvers<ApolloContextType>['Query']['me'] = async (_, __, { user }) => {
  if (!user) throw new AuthenticationError(ERRORS_ENUM.AUTHENTICATION_ERROR_INVALID_CREDENTIALS);

  return {
    user: {
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    },
  };
};
