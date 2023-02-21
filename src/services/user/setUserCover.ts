import { userModel } from '../../models/user-model';

export const setUserCover = async (userId: number, data: Buffer, contentType: string): Promise<void> => {
  const user = await userModel.findOne({ userId });

  if (!user) {
    throw new Error('Not Found');
  }

  const cover = { data, contentType };
  user.images.cover = cover;

  await user.save();
};
