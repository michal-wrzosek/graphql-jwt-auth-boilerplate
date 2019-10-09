import { ContextFunction } from 'apollo-server-core';
import jwt from 'jsonwebtoken';

import { AccessTokenDataType } from './generateAccessToken';
import { JWT_SECRET } from 'src/configuration';
import User, { UserModelProps } from 'src/models/user';
import { Request, Response } from 'express';
import { userCan, UserCanPayload } from 'src/privileges/userCan';

export type ApolloContextType = {
  req: Request;
  res: Response;
  user?: UserModelProps;
  userCan: UserCanPayload;
};

export const context: ContextFunction<ApolloContextType> = async ({ req, res }) => {
  let user: UserModelProps | undefined;

  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const { email } = jwt.verify(accessToken, JWT_SECRET) as AccessTokenDataType;
    user = await User.findOne({ email });
  } catch {}

  return { req, res, user, userCan: userCan(user) };
};
