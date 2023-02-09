import { devPostsController } from './dev';
import { prodPostsController } from './prod';

const postsController = {} as typeof devPostsController;

if (process.env.MODE === 'dev') {
  Object.assign(postsController, devPostsController);
} else if (process.env.MODE === 'prod') {
  Object.assign(postsController, prodPostsController);
}

export { postsController };
