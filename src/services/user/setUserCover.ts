import { UserDto } from '../../dtos/user-dto';
import { userModel } from '../../models/user-model';
import { User } from '../../types';

export const setUserCover = async (userId: number, data: Buffer, contentType: string): Promise<User> => {
  const user = await userModel.findOne({ userId });

  if (!user) {
    throw new Error('Not Found');
  }

  const cover = { data, contentType };
  user.images.cover = cover;

  await user.save();

  const userDto = new UserDto(user);

  return userDto;
};
