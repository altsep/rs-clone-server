import { UserDto } from '../../dtos/user-dto';
import { userModel } from '../../models/user-model';

export const getUser = async (id: string): Promise<UserDto> => {
  let user;

  if (/^id\d+/.test(id)) {
    const userId = Number(id.replace('id', ''));
    user = await userModel.findOne({ userId });
  } else {
    user = await userModel.findOne({ alias: id });
  }

  if (!user) {
    throw new Error('Not Found');
  }

  const userData = new UserDto(user);

  return userData;
};
