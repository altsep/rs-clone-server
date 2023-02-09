import { body } from 'express-validator';
import { app } from '../app';
import { postsController } from '../controllers/posts';

app.get('/api/posts', postsController.getPosts);

app.post(
  '/api/posts',
  body('userId').exists().isNumeric(),
  body('description').exists().isString(),
  postsController.addPost
);

app.get('/api/posts/:id', postsController.getPost);

app.patch(
  '/api/posts/:id',
  body('description').optional().isString(),
  body('commentsIds').optional().isArray(),
  body('likes').optional().isNumeric(),
  body('likedUserIds').optional().isArray(),
  postsController.updatePost
);

app.delete('/api/posts/:id', postsController.removePost);
