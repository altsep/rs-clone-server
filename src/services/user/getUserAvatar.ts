import { ImageSchema } from '../../models/types';
import { userModel } from '../../models/user-model';

export const getUserAvatar = async (userId: number): Promise<ImageSchema | undefined> => {
  const user = await userModel.findOne({ userId });

  if (!user) {
    throw new Error('Not Found');
  }

  return user.images.avatar;
};
