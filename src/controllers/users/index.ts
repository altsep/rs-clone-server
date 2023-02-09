import { devUsersController } from './dev';
import { prodUsersController } from './prod';

const usersController = process.env.MODE === 'dev' ? devUsersController : prodUsersController;

export { usersController };
