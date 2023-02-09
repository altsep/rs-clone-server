import { UserDto } from '../../dtos/user-dto';
import { userModel } from '../../models/user-model';
import { User } from '../../types';

export const updateUser = async (id: string, data: Partial<User>): Promise<UserDto> => {
  const user = await userModel.findOneAndUpdate({ userId: Number(id) }, data, { new: true });

  if (!user) {
    throw new Error('Not Found');
  }

  const userData = new UserDto(user);

  return userData;
};
