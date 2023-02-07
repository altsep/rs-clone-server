import { body } from 'express-validator';
import { app } from '../../app';
import { getPost } from './handlers/getPost';
import { getPosts } from './handlers/getPosts';
import { addPost } from './handlers/addPost';
import { updatePost } from './handlers/updatePost';
import { removePost } from './handlers/removePost';

app.get('/api/posts', getPosts);

app.post('/api/posts', body('userId').exists(), body('description').exists(), addPost);

app.get('/api/posts/:id', getPost);

app.patch(
  '/api/posts/:id',
  body('description').optional(),
  body('commentsIds').optional(),
  body('likes').optional(),
  body('likedUserIds').optional(),
  updatePost
);

app.delete('/api/posts/:id', removePost);
