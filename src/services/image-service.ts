/* eslint-disable class-methods-use-this */
import { UserDto } from '../dtos/user-dto';
import { ImageSchema } from '../models/types';
import { userModel } from '../models/user-model';
import { User } from '../types';

class ImageService {
  public setUserAvatar = async (userId: number, img: ImageSchema): Promise<User> => {
    const user = await userModel.findOne({ userId });

    if (!user) {
      throw new Error('Not Found');
    }

    user.images.avatar = img;

    await user.save();

    const userDto = new UserDto(user);

    return userDto;
  };

  public setUserCover = async (userId: number, img: ImageSchema): Promise<UserDto> => {
    const user = await userModel.findOne({ userId });

    if (!user) {
      throw new Error('Not Found');
    }

    user.images.cover = img;

    await user.save();

    const userDto = new UserDto(user);

    return userDto;
  };

  public getUserAvatar = async (userId: number): Promise<ImageSchema | undefined> => {
    const user = await userModel.findOne({ userId });

    if (!user) {
      throw new Error('Not Found');
    }

    return user.images.avatar;
  };

  public getUserCover = async (userId: number): Promise<ImageSchema | undefined> => {
    const user = await userModel.findOne({ userId });

    if (!user) {
      throw new Error('Not Found');
    }

    return user.images.cover;
  };
}

export const imageService = new ImageService();
