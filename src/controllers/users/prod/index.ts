import { getUser } from './getUser';
import { getUsers } from './getUsers';
import { updateUser } from './updateUser';
import { hideUser } from './hideUser';
import { authUser } from './authUser';
import { addUser } from './addUser';

const prodUsersController = { getUser, getUsers, addUser, updateUser, hideUser, authUser };

export { prodUsersController };
