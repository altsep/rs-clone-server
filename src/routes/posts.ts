import { body } from 'express-validator';
import { app } from '../app';
import { getPost } from '../controllers/posts-dev/getPost';
import { getPosts } from '../controllers/posts-dev/getPosts';
import { addPost } from '../controllers/posts-dev/addPost';
import { updatePost } from '../controllers/posts-dev/updatePost';
import { removePost } from '../controllers/posts-dev/removePost';

if (process.env.MODE === 'dev') {
  app.get('/api/posts', getPosts);

  app.post('/api/posts', body('userId').exists().isNumeric(), body('description').exists().isString(), addPost);

  app.get('/api/posts/:id', getPost);

  app.patch(
    '/api/posts/:id',
    body('description').optional().isString(),
    body('commentsIds').optional().isArray(),
    body('likes').optional().isNumeric(),
    body('likedUserIds').optional().isArray(),
    updatePost
  );

  app.delete('/api/posts/:id', removePost);
}
