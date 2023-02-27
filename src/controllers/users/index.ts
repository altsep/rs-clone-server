import { handleGetUser as getUser } from './getUser';
import { getUsers } from './getUsers';
import { handleUpdateUser as updateUser } from './updateUser';
import { handleChangePassword as changePassword } from './changePassword';
import { handleDeleteUser as deleteUser } from './deleteUser';

const usersController = { getUser, getUsers, updateUser, changePassword, deleteUser };

export { usersController };
