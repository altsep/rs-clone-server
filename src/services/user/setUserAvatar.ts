import { UserDto } from '../../dtos/user-dto';
import { userModel } from '../../models/user-model';
import { User } from '../../types';

export const setUserAvatar = async (userId: number, data: Buffer, contentType: string): Promise<User> => {
  const user = await userModel.findOne({ userId });

  if (!user) {
    throw new Error('Not Found');
  }

  const avatar = { data, contentType };
  user.images.avatar = avatar;

  await user.save();

  const userDto = new UserDto(user);

  return userDto;
};
