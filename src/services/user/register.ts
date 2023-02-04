import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { userModel } from '../../models/user-model';
import { sendActivationMail } from '../mail/sendActivationMail';
import { UserDto } from '../../dtos/user-dto';
import { generateTokens } from '../token/generateTokens';
import { saveToken } from '../token/saveToken';
import { Tokens, User, UserSchema } from '../../types';

type TResponseData = { user: UserSchema } & Tokens;

const throwOnCandidate = async (filter: Partial<User<string>>): Promise<void> => {
  const candidate = await userModel.findOne(filter);

  if (candidate) {
    const message = `User with ${JSON.stringify(filter)} exists`;
    throw new Error(message);
  }
};

export const register = async (data: User<string>): Promise<TResponseData> => {
  const { email, password, alias } = data;

  await throwOnCandidate({ email });

  if (alias) {
    await throwOnCandidate({ alias });
  }

  const hashPassword = await bcrypt.hash(password, 5);
  const activationLink = uuidv4();
  const user = await userModel.create({ ...data, password: hashPassword, activationLink });

  await sendActivationMail(email, activationLink);

  const userDto = new UserDto(user);
  const tokens: Tokens = generateTokens({ ...userDto });

  await saveToken(userDto.id, tokens.refreshToken);

  return { ...tokens, user: userDto };
};
