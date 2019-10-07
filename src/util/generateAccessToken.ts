import jwt from 'jsonwebtoken';

import { JWT_SECRET, ACCESS_TOKEN_MINUTES_TO_EXPIRE } from 'src/configuration';

export type AccessTokenDataType = {
  email: string;
};

export const generateAccessToken = (email: string) => {
  const accessTokenData: AccessTokenDataType = {
    email,
  };

  return jwt.sign(accessTokenData, JWT_SECRET, {
    expiresIn: `${ACCESS_TOKEN_MINUTES_TO_EXPIRE}m`,
  });
};
