import { Document } from 'mongoose';
import { tokenModel } from '../../models/token-model';

export const saveToken = async (userId: string | undefined, refreshToken: string): Promise<Document<unknown>> => {
  const tokenData = await tokenModel.findOne({ user: userId });

  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }

  const token = tokenModel.create({
    user: userId,
    refreshToken,
  });

  return token;
};
