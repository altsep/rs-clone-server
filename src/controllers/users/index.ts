import { devUsersController } from './dev';
import { prodUsersController } from './prod';

const usersController = {} as typeof devUsersController | typeof prodUsersController;

if (process.env.MODE === 'dev') {
  Object.assign(usersController, devUsersController);
} else if (process.env.MODE === 'prod') {
  Object.assign(usersController, prodUsersController);
}

export { usersController };
