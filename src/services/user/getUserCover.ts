import { ImageSchema } from '../../models/types';
import { userModel } from '../../models/user-model';

export const getUserCover = async (userId: number): Promise<ImageSchema> => {
  const user = await userModel.findOne({ userId });

  if (!user || user.images.cover == null) {
    throw new Error('Not Found');
  }

  return user.images.cover;
};
