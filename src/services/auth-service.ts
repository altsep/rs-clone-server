import bcrypt from 'bcrypt';
import { DeleteResult } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from '../dtos/user-dto';
import { userModel } from '../models/user-model';
import { ResponseData, Tokens, User } from '../types';
import { mailService } from './mail-service';
import { tokenService } from './token-service';

/* eslint-disable class-methods-use-this */
class AuthService {
  public register = async (data: User): Promise<ResponseData> => {
    const { email, password } = data;

    if (email == null) {
      throw new Error('Bad Request');
    }

    await this.throwOnUser({ email });

    const hashPassword = await bcrypt.hash(password, 5);
    const activationLink = uuidv4();

    const lastUser = await userModel.findOne().sort({ userId: -1 });

    const userId = lastUser ? lastUser.userId + 1 : 1;

    const user = await userModel.create({ ...data, userId, password: hashPassword, activationLink });

    const mailActivation = process.env.MODE !== 'dev';

    if (mailActivation) {
      const baseURL = process.env.API_URL || 'localhost:3000';
      const fullActivationLink = `${baseURL}/api/activate/${activationLink}`;
      await mailService.sendActivationMail(email, fullActivationLink);
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(user._id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  };

  public activate = async (activationLink: string): Promise<void> => {
    const user = await userModel.findOne({ activationLink });

    if (!user) {
      throw new Error('Incorrect activation link');
    }

    user.isActivated = true;

    await user.save();
  };

  public login = async (email: string, password: string): Promise<ResponseData> => {
    const user = await userModel.findOne({ email, deleted: { $ne: true } });

    if (!user) {
      throw new Error('Not Found');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error('Unauthorized');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(user._id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  };

  public refresh = async (refreshToken: string): Promise<ResponseData> => {
    const userData = tokenService.validateRefreshToken(refreshToken) as User | undefined;
    const tokenData = await tokenService.findRefreshToken(refreshToken);

    if (!userData || !tokenData) {
      throw new Error('Unauthorized');
    }

    const user = await userModel.findOne({ email: userData.email });

    if (!user) {
      throw new Error('Not Found');
    }

    const userDto = new UserDto(user);
    const tokens: Tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(user._id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  };

  public logout = async (refreshToken: string): Promise<DeleteResult> => {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  };

  private throwOnUser = async (filter: Partial<User>): Promise<void> => {
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
}

export const authService = new AuthService();
