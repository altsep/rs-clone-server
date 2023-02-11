import { UserDto } from '../../dtos/user-dto';
import { userModel } from '../../models/user-model';
import { User } from '../../types';

export const updatePendingFriendsIds = async (id: string, data: Partial<User>): Promise<User> => {
  const user = await userModel.findOneAndUpdate({ userId: Number(id) }, data, { new: true });

  if (!user) {
    throw new Error('Not Found');
  }

  const userData = new UserDto(user);

  return userData;
};
