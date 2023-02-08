import { Document } from 'mongoose';
import { tokenModel } from '../../models/token-model';

export const saveToken = async (id: string | undefined, refreshToken: string): Promise<Document<unknown>> => {
  const tokenData = await tokenModel.findOne({ user: id });

  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }

  const token = tokenModel.create({
    user: id,
    refreshToken,
  });

  return token;
};
