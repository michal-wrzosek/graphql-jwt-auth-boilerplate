import { createVadidator } from 'schemat';
import { UserInputError, ForbiddenError } from 'apollo-server-core';

import { Resolvers } from 'src/generated/graphql';
import { ApolloContextType } from 'src/util/context';
import { requiredValidator } from 'src/validators/requiredValidator';
import { minStringValidator } from 'src/validators/minStringValidator';
import { ERRORS_ENUM } from 'src/types/ErrorsEnum';
import User from 'src/models/user';

const validator = createVadidator({
  email: [requiredValidator, minStringValidator(1)],
});

export const getUser: Resolvers<ApolloContextType>['Query']['getUser'] = async (_, input, { userCan }) => {
  const validationErrors = validator(input);
  if (validationErrors) throw new UserInputError(ERRORS_ENUM.VALIDATION_ERROR, { validationErrors });

  if (!userCan.getUser()) throw new ForbiddenError(ERRORS_ENUM.AUTHORIZATION_ERROR);

  const { email } = input;
  const user = await User.findOne({ email });
  if (!user) throw new UserInputError(ERRORS_ENUM.VALIDATION_ERROR_NO_SUCH_RECORD);

  return user.toObject();
};
