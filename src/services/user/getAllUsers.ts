import { UserDto } from '../../dtos/user-dto';
import { UserSchema } from '../../models/types';
import { userModel } from '../../models/user-model';

export const getAllUsers = async (): Promise<UserDto[]> => {
  const users: UserSchema[] = await userModel.find();
  return users.map((u) => new UserDto(u));
};
