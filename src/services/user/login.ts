import bcrypt from 'bcrypt';
import { UserDto } from '../../dtos/user-dto';
import { userModel } from '../../models/user-model';
import { generateTokens } from '../token/generateTokens';
import { ResponseData } from './types';
import { saveToken } from '../token/saveToken';

export const login = async (email: string, password: string): Promise<ResponseData> => {
  const user = await userModel.findOne({ email });

  if (!user) {
    throw new Error('Not Found');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error('Unauthorized');
  }

  const userDto = new UserDto(user);
  const tokens = generateTokens({ ...userDto });

  await saveToken(user._id, tokens.refreshToken);

  return { ...tokens, user: userDto };
};
