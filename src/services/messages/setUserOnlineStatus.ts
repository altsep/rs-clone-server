import { UserDto } from '../../dtos/user-dto';
import { userModel } from '../../models/user-model';

export const setUserOnlineStatus = async (userId: number, status: boolean): Promise<UserDto> => {
  const user = await userModel.findOne({ userId });

  if (!user) {
    throw new Error('Not found');
  }

  user.isOnline = status;

  await user.save();

  const userDto = new UserDto(user);

  return userDto;
};
