import { ForbiddenError } from 'apollo-server-core';

import { Resolvers } from 'src/generated/graphql';
import { ApolloContextType } from 'src/util/context';
import { ERRORS_ENUM } from 'src/types/ErrorsEnum';
import User from 'src/models/user';

export const getUsers: Resolvers<ApolloContextType>['Query']['getUsers'] = async (_, __, { userCan }) => {
  if (!userCan.getUsers()) throw new ForbiddenError(ERRORS_ENUM.AUTHORIZATION_ERROR);

  const users = await User.find();

  return users.map(user => user.toObject());
};
