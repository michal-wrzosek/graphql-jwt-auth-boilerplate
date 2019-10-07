import { UserInputError, AuthenticationError } from 'apollo-server-core';
import { createVadidator } from 'schemat';
import jwt from 'jsonwebtoken';

import { ERRORS_ENUM } from 'src/types/ErrorsEnum';
import { minStringValidator } from 'src/validators/minStringValidator';
import { requiredValidator } from 'src/validators/requiredValidator';
import { AccessTokenDataType } from './generateAccessToken';
import { JWT_SECRET } from 'src/configuration';
import User from 'src/models/user';

const accessTokenValidator = createVadidator({
  accessToken: [requiredValidator, minStringValidator(1)],
});

export const getAuthenticatedUser = async (accessToken: string | undefined) => {
  const validationErrors = accessTokenValidator({ accessToken });
  if (validationErrors) throw new UserInputError(ERRORS_ENUM.VALIDATION_ERROR, { validationErrors });

  let user;

  try {
    const { email } = jwt.verify(accessToken, JWT_SECRET) as AccessTokenDataType;
    user = await User.findOne({ email });
    if (!user) throw new Error();
  } catch {
    throw new AuthenticationError(ERRORS_ENUM.AUTHENTICATION_ERROR_INVALID_CREDENTIALS);
  }

  return user;
};
