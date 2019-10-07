import { Resolvers } from 'src/generated/graphql';
import { ApolloContextType } from 'src/types/ApolloContextType';
import { getAuthenticatedUser } from 'src/util/getAuthenticatedUser';

export const me: Resolvers<ApolloContextType>['Query']['me'] = async (_, { accessToken }) => {
  let user;

  try {
    user = await getAuthenticatedUser(accessToken);
  } catch (error) {
    throw error;
  }

  return {
    user: {
      email: user.email,
      role: user.role,
    },
  };
};
