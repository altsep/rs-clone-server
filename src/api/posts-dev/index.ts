import { body } from 'express-validator';
import { app } from '../../app';
import { getPost } from './handlers/getPost';
import { getPosts } from './handlers/getPosts';
import { addPost } from './handlers/addPost';
import { updatePost } from './handlers/updatePost';
import { removePost } from './handlers/removePost';

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
