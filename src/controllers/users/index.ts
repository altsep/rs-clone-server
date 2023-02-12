import { handleGetUser as getUser } from './getUser';
import { getUsers } from './getUsers';
import { handleUpdateUser as updateUser } from './updateUser';
import { addUser } from './addUser';

const usersController = { getUser, getUsers, addUser, updateUser };

export { usersController };
