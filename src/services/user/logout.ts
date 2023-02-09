import { DeleteResult } from 'mongodb';
import { removeToken } from '../token/removeToken';

export const logout = async (refreshToken: string): Promise<DeleteResult> => {
  const token = await removeToken(refreshToken);
  return token;
};
