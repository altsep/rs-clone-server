import { devPostsController } from './dev';
import { prodPostsController } from './prod';

const postsController = process.env.MODE === 'dev' ? devPostsController : prodPostsController;

export { postsController };
