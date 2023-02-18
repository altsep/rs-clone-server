import { handleGetUser as getUser } from './getUser';
import { getUsers } from './getUsers';
import { handleUpdateUser as updateUser } from './updateUser';

const usersController = { getUser, getUsers, updateUser };

export { usersController };
