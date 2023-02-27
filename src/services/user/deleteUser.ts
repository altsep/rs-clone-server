import bcrypt from 'bcrypt';
import { userModel } from '../../models/user-model';
import { User } from '../../types';
import { findRefreshToken } from '../token/findToken';
import { validateRefreshToken } from '../token/validateAccessToken';

export const deleteUser = async (userId: number, password: string, refreshToken: string): Promise<void> => {
  const user = await userModel.findOne({ userId });

  if (!user) {
    throw new Error('Not Found');
  }

  const validatedUserData = validateRefreshToken(refreshToken) as User | undefined;
  const tokenData = await findRefreshToken(refreshToken);
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect || !validatedUserData || !tokenData || validatedUserData.id !== userId) {
    throw new Error('Unauthorized');
  }

  user.deleted = true;
  user.alias = undefined;
  user.email = undefined;

  await user.save();
};
