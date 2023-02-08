import { devPostsController } from './dev';

const postsController = {} as typeof devPostsController;

if (process.env.MODE === 'dev') {
  Object.assign(postsController, devPostsController);
}

export { postsController };
