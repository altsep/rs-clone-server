import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { userModel } from '../../models/user-model';
import { sendActivationMail } from '../mail/sendActivationMail';
import { UserDto } from '../../dtos/user-dto';
import { generateTokens } from '../token/generateTokens';
import { saveToken } from '../token/saveToken';
import { Tokens, User, UserModel } from '../../types';
import { handleError } from '../../api/utils';

type ResponseData = { user: UserModel } & Tokens;

export const register = async (req: Request, res: Response, data: User<string>): Promise<ResponseData> => {
  const { email, password } = data;
  const candidate = await userModel.findOne({ email });

  if (candidate) {
    const message = `User with email ${email} exists`;
    handleError({ req, res, message });
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
