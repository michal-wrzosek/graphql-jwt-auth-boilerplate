import { ContextFunction } from 'apollo-server-core';
import jwt from 'jsonwebtoken';

import { AccessTokenDataType } from './generateAccessToken';
import { JWT_SECRET } from 'src/configuration';
import User, { UserModelProps } from 'src/models/user';
import { Request, Response } from 'express';

export type ApolloContextType = {
  req: Request;
  res: Response;
  user?: UserModelProps;
};

export const context: ContextFunction<ApolloContextType> = async ({ req, res }) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const { email } = jwt.verify(accessToken, JWT_SECRET) as AccessTokenDataType;
    const user = await User.findOne({ email });
    if (!user) throw new Error();
    return { req, res, user };
  } catch {
    return { req, res };
  }
};
