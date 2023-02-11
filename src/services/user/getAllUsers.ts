import { UserDto } from '../../dtos/user-dto';
import { userModel } from '../../models/user-model';
import type { User } from '../../types';

export const getAllUsers = async (): Promise<User[]> => {
  const users = await userModel.find();
  return users.map((u) => new UserDto(u));
};
