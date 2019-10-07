import { NODE_ENVS_ENUM } from 'src/types/NodeEnvsEnum';

export const IS_PRODUCTION: boolean = process.env.NODE_ENV === NODE_ENVS_ENUM.PRODUCTION || false;
export const PORT: string = process.env.PORT || '3001';
export const MONGODB_URI: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/graphql-jwt-auth-boilerplate';
export const JWT_SECRET: string = process.env.JWT_SECRET || 'jwt_secret';
export const MASTER_USER_EMAIL: string = process.env.MASTER_USER_EMAIL || 'example@user.com';
export const MASTER_USER_PASSWORD: string = process.env.MASTER_USER_PASSWORD || 'example_password';
export const ACCESS_TOKEN_MINUTES_TO_EXPIRE: number = Number(process.env.ACCESS_TOKEN_MINUTES_TO_EXPIRE) || 5;
export const REFRESH_TOKEN_LENGTH: number = Number(process.env.REFRESH_TOKEN_LENGTH) || 64;
export const REFRESH_TOKEN_DAYS_TO_EXPIRE: number = Number(process.env.REFRESH_TOKEN_DAYS_TO_EXPIRE) || 60;
export const REFRESH_TOKEN_COOKIE_NAME: string = process.env.REFRESH_TOKEN_COOKIE_NAME || 'refreshToken';
