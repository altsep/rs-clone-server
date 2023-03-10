import { tokenModel } from '../../models/token-model';
import { TokenSchema } from '../../models/types';

export const findRefreshToken = async (refreshToken: string): Promise<TokenSchema | null> => {
  const tokenData = await tokenModel.findOne({ refreshToken });
  return tokenData;
};
