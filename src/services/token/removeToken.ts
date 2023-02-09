import { DeleteResult } from 'mongodb';
import { tokenModel } from '../../models/token-model';

export const removeToken = async (refreshToken: string): Promise<DeleteResult> => {
  const tokenData = await tokenModel.deleteOne({ refreshToken });
  return tokenData;
};
