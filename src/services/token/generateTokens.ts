import jwt from 'jsonwebtoken';
import { User } from '../../types';

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

const generateTokens = (payload: Partial<User> | string): ITokens => {
  const accessOpts = { expiresIn: '30m' };
  const accessSecret = process.env.JWT_ACCESS_SECRET || '';
  const accessToken: string = jwt.sign(payload, accessSecret, accessOpts);

  const refreshOpts = { expiresIn: '30d' };
  const refreshSecret = process.env.JWT_REFRESH_SECRET || '';
  const refreshToken: string = jwt.sign(payload, refreshSecret, refreshOpts);

  return { accessToken, refreshToken };
};

export type { ITokens as Tokens };

export { generateTokens };
