import { UserDto } from '../../dtos/user-dto';
import { userModel } from '../../models/user-model';
import type { User } from '../../types';

export const getAllUsers = async (): Promise<User[]> => {
  const users = await userModel.find({ deleted: { $ne: true } });
  return users.map((u) => new UserDto(u));
};
