/* eslint-disable class-methods-use-this */
import bcrypt from 'bcrypt';
import { FilterQuery } from 'mongoose';
import { UserDto } from '../dtos/user-dto';
import { UserSchema } from '../models/types';
import { userModel } from '../models/user-model';
import { ResponseData, User } from '../types';
import { tokenService } from './token-service';

class UserService {
  public getUser = async (id: string): Promise<UserDto> => {
    const query: FilterQuery<UserSchema> = { deleted: { $ne: true } };

    if (/^id\d+/.test(id)) {
      const userId = Number(id.replace('id', ''));
      query.userId = userId;
    } else {
      query.alias = id;
    }

    const user = await userModel.findOne(query);

    if (!user) {
      throw new Error('Not Found');
    }

    const userData = new UserDto(user);

    return userData;
  };

  public getAllUsers = async (): Promise<User[]> => {
    const users = await userModel.find({ deleted: { $ne: true } });
    return users.map((u) => new UserDto(u));
  };

  public updateUser = async (userId: number, data: Partial<User>, refreshToken: string): Promise<User> => {
    const validatedUserData = tokenService.validateRefreshToken(refreshToken);
    const tokenData = await tokenService.findRefreshToken(refreshToken);

    if (!validatedUserData || !tokenData) {
      throw new Error('Unauthorized');
    }

    const user = await userModel.findOneAndUpdate({ userId }, data, { new: true });

    if (!user) {
      throw new Error('Not Found');
    }

    const userData = new UserDto(user);

    return userData;
  };

  public changePassword = async (userId: number, password: string, refreshToken: string): Promise<ResponseData> => {
    const user = await userModel.findOne({ userId });

    if (!user) {
      throw new Error('Not Found');
    }

    const validatedUserData = tokenService.validateRefreshToken(refreshToken);
    const tokenData = await tokenService.findRefreshToken(refreshToken);

    if (!validatedUserData || !tokenData) {
      throw new Error('Unauthorized');
    }

    const hashPassword = await bcrypt.hash(password, 5);

    user.password = hashPassword;

    await user.save();

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(user._id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  };

  public deleteUser = async (userId: number, password: string, refreshToken: string): Promise<void> => {
    const user = await userModel.findOne({ userId });

    if (!user) {
      throw new Error('Not Found');
    }

    const validatedUserData = tokenService.validateRefreshToken(refreshToken) as User | undefined;
    const tokenData = await tokenService.findRefreshToken(refreshToken);
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect || !validatedUserData || !tokenData || validatedUserData.id !== userId) {
      throw new Error('Unauthorized');
    }

    user.deleted = true;
    user.alias = undefined;
    user.email = undefined;

    await user.save();
  };

  public updatePendingFriendsIds = async (id: string, data: Partial<User>): Promise<User> => {
    const user = await userModel.findOneAndUpdate({ userId: Number(id) }, data, { new: true });

    if (!user) {
      throw new Error('Not Found');
    }

    const userData = new UserDto(user);

    return userData;
  };
}

export const userService = new UserService();
