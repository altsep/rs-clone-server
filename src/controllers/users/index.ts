import { handleGetUser as getUser } from './getUser';
import { getUsers } from './getUsers';
import { handleUpdateUser as updateUser } from './updateUser';
import { handleChangePassword as changePassword } from './changePassword';

const usersController = { getUser, getUsers, updateUser, changePassword };

export { usersController };
