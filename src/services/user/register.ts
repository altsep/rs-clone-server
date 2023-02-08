import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { userModel } from '../../models/user-model';
import { sendActivationMail } from '../mail/sendActivationMail';
import { UserDto } from '../../dtos/user-dto';
import { generateTokens, Tokens } from '../token/generateTokens';
import { saveToken } from '../token/saveToken';
import { User } from '../../types';
import { ResponseData } from './types';

const throwOnUser = async (filter: Partial<User>): Promise<void> => {
  if (Object.keys(filter).length > 1) {
    const message = 'Only one filter property is allowed';
    throw new Error(message);
  }

  const user = await userModel.findOne(filter);

  if (user) {
    const [key, value] = Object.entries(filter)[0];
    const message = `User with ${key} ${String(value)} exists`;
    throw new Error(message);
  }
};

export const register = async (data: User): Promise<ResponseData> => {
  const { email, password, alias } = data;

  await throwOnUser({ email });

  if (alias) {
    await throwOnUser({ alias });
  }

  const hashPassword = await bcrypt.hash(password, 5);
  const activationLink = uuidv4();

  const user = await userModel.create({ ...data, password: hashPassword, activationLink });

  const mailActivation = process.env.MODE !== 'dev';

  if (mailActivation) {
    const baseURL = process.env.API_URL || 'localhost:3000';
    const fullActivationLink = `${baseURL}/api/activate/${activationLink}`;
    await sendActivationMail(email, fullActivationLink);
  }

  const userDto = new UserDto(user);
  const tokens: Tokens = generateTokens({ ...userDto });

  await saveToken(userDto.id, tokens.refreshToken);

  return { ...tokens, user: userDto };
};
