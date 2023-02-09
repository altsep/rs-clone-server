import { UserDto } from '../../dtos/user-dto';
import { UserSchema } from '../../models/types';
import { userModel } from '../../models/user-model';
import { findToken } from '../token/findToken';
import { generateTokens, Tokens } from '../token/generateTokens';
import { saveToken } from '../token/saveToken';
import { validateRefreshToken } from '../token/validateAccessToken';
import { ResponseData } from './types';

export const refresh = async (refreshToken: string): Promise<ResponseData> => {
  const userData = validateRefreshToken(refreshToken) as UserSchema;
  const tokenData = await findToken(refreshToken);

  if (!userData || !tokenData) {
    throw new Error(401);
  }

  const user = await userModel.findById(userData.id);

  if (!user) {
    throw new Error('Not Found');
  }

  const userDto = new UserDto(user);
  const tokens: Tokens = generateTokens({ ...userDto });

  await saveToken(user.id, tokens.refreshToken);

  return { ...tokens, user: userDto };
};
