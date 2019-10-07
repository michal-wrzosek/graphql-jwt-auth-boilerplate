/**
 * Generates refreshToken essentials
 * @returns x characters long token and y days from now expire date in numbers of seconds since epoch
 */
export const generateRefreshToken = (tokenLength: number, daysToExpire: number) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';

  for (let i = 0; i < tokenLength; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }

  const expire = Math.round(+new Date() / 1000) + 60 * 60 * 24 * daysToExpire;

  return {
    token,
    expire,
  };
};
