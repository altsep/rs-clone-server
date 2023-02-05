import { userModel } from '../../models/user-model';

export const activate = async (activationLink: string): Promise<void> => {
  const user = await userModel.findOne({ activationLink });

  if (!user) {
    throw new Error('Incorrect activation link');
  }

  user.isActivated = true;

  await user.save();
};
