import jwt, { JwtPayload } from 'jsonwebtoken';

export const validateAccessToken = (token: string): string | JwtPayload | undefined => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET || '');
    return userData;
  } catch (e) {
    return undefined;
  }
};

export const validateRefreshToken = (token: string): string | JwtPayload | undefined => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET || '');
    return userData;
  } catch (e) {
    return undefined;
  }
};
