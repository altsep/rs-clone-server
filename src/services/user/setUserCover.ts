import { UserDto } from '../../dtos/user-dto';
import { ImageSchema } from '../../models/types';
import { userModel } from '../../models/user-model';

export const setUserCover = async (userId: number, img: ImageSchema): Promise<UserDto> => {
  const user = await userModel.findOne({ userId });

  if (!user) {
    throw new Error('Not Found');
  }

  user.images.cover = img;

  await user.save();

  const userDto = new UserDto(user);

  return userDto;
};
