import { FilterQuery } from 'mongoose';
import { UserDto } from '../../dtos/user-dto';
import { UserSchema } from '../../models/types';
import { userModel } from '../../models/user-model';

export const getUser = async (id: string): Promise<UserDto> => {
  const query: FilterQuery<UserSchema> = { deleted: { $ne: true } };

  if (/^id\d+/.test(id)) {
    const userId = Number(id.replace('id', ''));
    query.userId = userId;
  } else {
    query.alias = id;
  }

  const user = await userModel.findOne(query);

  if (!user) {
    throw new Error('Not Found');
  }

  const userData = new UserDto(user);

  return userData;
};
