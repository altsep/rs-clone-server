import bcrypt from 'bcrypt';
import { UserDto } from '../../dtos/user-dto';
import { userModel } from '../../models/user-model';
import { generateTokens, Tokens } from '../token/generateTokens';
import { ResponseData } from './types';
import { saveToken } from '../token/saveToken';

export const login = async (email: string, password: string): Promise<ResponseData> => {
  const user = await userModel.findOne({ email });

  if (!user) {
    throw new Error('BAD_REQUEST');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error('UNAUTHORIZED');
  }

  const userDto = new UserDto(user);
  const tokens: Tokens = generateTokens({ ...userDto });

  // eslint-disable-next-line no-underscore-dangle
  await saveToken(user._id, tokens.refreshToken);

  return { ...tokens, user: userDto };
};
