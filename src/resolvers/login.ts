import { AuthenticationError, UserInputError } from 'apollo-server-core';
import { createVadidator } from 'schemat';

import { ApolloContextType } from 'src/util/context';
import { Resolvers } from 'src/generated/graphql';
import { ERRORS_ENUM } from 'src/types/ErrorsEnum';
import { requiredValidator } from 'src/validators/requiredValidator';
import { emailValidator } from 'src/validators/emailValidator';
import { minStringValidator } from 'src/validators/minStringValidator';
import User from 'src/models/user';
import RefreshToken from 'src/models/refreshToken';
import { ACCESS_TOKEN_MINUTES_TO_EXPIRE } from 'src/configuration';
import { generateAccessToken } from 'src/util/generateAccessToken';
import { setRefreshTokenCookie } from 'src/util/setRefreshTokenCookie';

const loginValidator = createVadidator({
  email: [requiredValidator, emailValidator],
  password: [requiredValidator, minStringValidator(1)],
});

export const login: Resolvers<ApolloContextType>['Mutation']['login'] = async (_, { loginInput }, { res }) => {
  const validationErrors = loginValidator(loginInput);
  if (validationErrors) throw new UserInputError(ERRORS_ENUM.VALIDATION_ERROR, { validationErrors });

  const { email, password } = loginInput;

  const user = await User.findOne({ email }, '+password');

  // no such user
  if (!user) throw new AuthenticationError(ERRORS_ENUM.AUTHENTICATION_ERROR_INVALID_CREDENTIALS);

  const isPasswordCorrect = await user.comparePassword(password);

  // incorrect password
  if (!isPasswordCorrect) throw new AuthenticationError(ERRORS_ENUM.AUTHENTICATION_ERROR_INVALID_CREDENTIALS);

  const refreshToken = await RefreshToken.create({ userEmail: user.email });

  const token = generateAccessToken(user.email);
  const expire = Math.round(+new Date() / 1000) + 60 * ACCESS_TOKEN_MINUTES_TO_EXPIRE;

  setRefreshTokenCookie(res, refreshToken.token);

  return {
    user: {
      email: user.email,
      role: user.role,
    },
    accessToken: {
      token,
      expire,
    },
  };
};
