import { UserInputError } from 'apollo-server-core';
import { createVadidator } from 'schemat';

import { Resolvers } from 'src/generated/graphql';
import { ApolloContextType } from 'src/types/ApolloContextType';
import { ERRORS_ENUM } from 'src/types/ErrorsEnum';
import User from 'src/models/user';
import { emailValidator } from 'src/validators/emailValidator';
import { passwordValidator } from 'src/validators/passwordValidator';

const registerValidator = createVadidator({
  email: emailValidator,
  password: passwordValidator,
});

export const register: Resolvers<ApolloContextType>['Mutation']['register'] = async (_, { registerInput }) => {
  const validationErrors = registerValidator(registerInput);
  if (validationErrors) throw new UserInputError(ERRORS_ENUM.VALIDATION_ERROR, { validationErrors });

  const { email, password } = registerInput;

  let user = await User.findOne({ email });

  // do not let the user know this email is taken (no errors)
  if (user) return null;

  user = await User.create({ email, password });

  return null;
};
