import { Response } from 'express';
import { REFRESH_TOKEN_COOKIE_NAME, IS_PRODUCTION, REFRESH_TOKEN_DAYS_TO_EXPIRE } from 'src/configuration';

export const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie(REFRESH_TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: IS_PRODUCTION,
    maxAge: 1000 * 60 * 60 * 24 * REFRESH_TOKEN_DAYS_TO_EXPIRE,
  });
};
