import { ImageSchema } from '../../models/types';
import { userModel } from '../../models/user-model';

export const getUserCover = async (userId: number): Promise<ImageSchema | undefined> => {
  const user = await userModel.findOne({ userId });

  if (!user) {
    throw new Error('Not Found');
  }

  return user.images.cover;
};
