import { body } from 'express-validator';
import { app } from '../app';
import { commentsController } from '../controllers/comments';

app.get('/api/comments', commentsController.getComments);

app.post(
  '/api/comments',
  body('postId').exists().isNumeric(),
  body('userId').exists().isNumeric(),
  body('description').exists().isString(),
  commentsController.addComment
);

app.get('/api/comments/:id', commentsController.getComment);

// app.patch(
//   '/api/comments/:id',
//   body('description').optional().isString(),
//   body('likes').optional().isNumeric(),
//   body('likedUserIds').optional().isArray(),
//   commentsController.updateComment
// );

// app.delete('/api/comments/:id', commentsController.removeComment);
