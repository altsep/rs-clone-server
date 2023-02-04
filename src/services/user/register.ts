import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { userModel } from '../../models/user-model';
import { sendActivationMail } from '../mail/sendActivationMail';
import { UserDto } from '../../dtos/user-dto';
import { generateTokens, ITokens as Tokens } from '../token/generateTokens';
import { saveToken } from '../token/saveToken';
import { UserSchema } from '../../models/types';
import { User } from '../../types';

type TResponseData = { user: UserSchema } & Tokens;

const throwOnCandidate = async (filter: Partial<User<string>>): Promise<void> => {
  const candidate = await userModel.findOne(filter);

  if (candidate) {
    const [key, value] = Object.entries(filter)[0];
    const message = `User with ${key} ${String(value)} exists`;
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
