import { userModel } from '../../models/user-model';

export const setUserAvatar = async (userId: number, data: Buffer, contentType: string): Promise<void> => {
  const user = await userModel.findOne({ userId });

  if (!user) {
    throw new Error('Not Found');
  }

  const avatar = { data, contentType };
  user.images.avatar = avatar;

  await user.save();
};
