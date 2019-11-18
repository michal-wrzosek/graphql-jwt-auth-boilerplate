import { AuthenticationError } from 'apollo-server-core';

import { Resolvers } from 'src/generated/graphql';
import { ERRORS_ENUM } from 'src/types/ErrorsEnum';
import RefreshToken from 'src/models/refreshToken';
import User from 'src/models/user';
import { ACCESS_TOKEN_MINUTES_TO_EXPIRE } from 'src/configuration';
import { generateAccessToken } from 'src/util/generateAccessToken';
import { setRefreshTokenCookie } from 'src/util/setRefreshTokenCookie';

export const refreshToken: Resolvers['Mutation']['refreshToken'] = async (_, __, { req, res }) => {
  if (typeof req.cookies.refreshToken !== 'string')
    throw new AuthenticationError(ERRORS_ENUM.AUTHENTICATION_ERROR_INVALID_CREDENTIALS);

  const refreshTokenInstance = await RefreshToken.findOne({ token: req.cookies.refreshToken });
  if (!refreshTokenInstance) throw new AuthenticationError(ERRORS_ENUM.AUTHENTICATION_ERROR_INVALID_CREDENTIALS);

  if (!refreshTokenInstance.isValid())
    throw new AuthenticationError(ERRORS_ENUM.AUTHENTICATION_ERROR_INVALID_CREDENTIALS);

  const user = await User.findOne({ email: refreshTokenInstance.userEmail });

  await refreshTokenInstance.invalidateToken();

  const newRefreshTokenInstance = await RefreshToken.create({ userEmail: user.email });

  const token = generateAccessToken(user.email);
  const expire = Math.round(+new Date() / 1000) + 60 * ACCESS_TOKEN_MINUTES_TO_EXPIRE;

  setRefreshTokenCookie(res, newRefreshTokenInstance.token);

  return {
    user: {
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    },
    accessToken: {
      token,
      expire,
    },
  };
};
