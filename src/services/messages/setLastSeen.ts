import { UserDto } from '../../dtos/user-dto';
import { userModel } from '../../models/user-model';
import { getIsoString } from '../../utils';

export const setLastSeen = async (userId: number): Promise<UserDto> => {
  const user = await userModel.findOne({ userId });

  if (!user) {
    throw new Error('Not found');
  }

  user.lastSeen = getIsoString();

  await user.save();

  const userDto = new UserDto(user);

  return userDto;
};
