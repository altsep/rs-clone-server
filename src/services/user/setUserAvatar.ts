import { UserDto } from '../../dtos/user-dto';
import { ImageSchema } from '../../models/types';
import { userModel } from '../../models/user-model';
import { User } from '../../types';

export const setUserAvatar = async (userId: number, img: ImageSchema): Promise<User> => {
  const user = await userModel.findOne({ userId });

  if (!user) {
    throw new Error('Not Found');
  }

  user.images.avatar = img;

  await user.save();

  const userDto = new UserDto(user);

  return userDto;
};
