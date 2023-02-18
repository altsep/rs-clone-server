import bcrypt from 'bcrypt';
import { UserDto } from '../../dtos/user-dto';
import { userModel } from '../../models/user-model';
import { User } from '../../types';
import { findRefreshToken } from '../token/findToken';
import { generateTokens } from '../token/generateTokens';
import { saveToken } from '../token/saveToken';
import { validateRefreshToken } from '../token/validateAccessToken';
import { ResponseData } from './types';

export const changePassword = async (userId: number, password: string, refreshToken: string): Promise<ResponseData> => {
  const user = await userModel.findOne({ userId });

  if (!user) {
    throw new Error('Not Found');
  }

  const validatedUserData = validateRefreshToken(refreshToken) as User | undefined;
  const tokenData = await findRefreshToken(refreshToken);

  if (!validatedUserData || !tokenData) {
    throw new Error('Unauthorized');
  }

  const hashPassword = await bcrypt.hash(password, 5);

  user.password = hashPassword;

  await user.save();

  const userDto = new UserDto(user);
  const tokens = generateTokens({ ...userDto });

  await saveToken(user._id, tokens.refreshToken);

  return { ...tokens, user: userDto };
};
