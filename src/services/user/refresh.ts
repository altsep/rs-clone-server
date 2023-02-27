import { UserDto } from '../../dtos/user-dto';
import { userModel } from '../../models/user-model';
import { User } from '../../types';
import { findRefreshToken } from '../token/findToken';
import { generateTokens, Tokens } from '../token/generateTokens';
import { saveToken } from '../token/saveToken';
import { validateRefreshToken } from '../token/validateAccessToken';
import { ResponseData } from './types';

export const refresh = async (refreshToken: string): Promise<ResponseData> => {
  const userData = validateRefreshToken(refreshToken) as User | undefined;
  const tokenData = await findRefreshToken(refreshToken);

  if (!userData || !tokenData) {
    throw new Error('Unauthorized');
  }

  const user = await userModel.findOne({ email: userData.email });

  if (!user) {
    throw new Error('Not Found');
  }

  const userDto = new UserDto(user);
  const tokens: Tokens = generateTokens({ ...userDto });

  await saveToken(user._id, tokens.refreshToken);

  return { ...tokens, user: userDto };
};
