import { Request, Response } from 'express';

export type ApolloContextType = {
  req: Request;
  res: Response;
};
