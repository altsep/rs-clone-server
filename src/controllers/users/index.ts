import { devUsersController } from './dev';

const usersController = {} as typeof devUsersController;

if (process.env.MODE === 'dev') {
  Object.assign(usersController, devUsersController);
}

export { usersController };
