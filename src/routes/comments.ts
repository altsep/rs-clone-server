import { body } from 'express-validator';
import { commentController } from '../controllers/comment.controller';
import { router } from '../router';

router.get('/comments', commentController.getAllComments);

router.post(
  '/comments',
  body(['postId', 'userId']).exists().isNumeric(),
  body('description').exists().isString(),
  commentController.addComment
);

router.get('/comments/:id', commentController.getComment);

router.patch(
  '/comments/:id',
  body('description').optional().isString(),
  body('likes').optional().isNumeric(),
  body('likedUserIds').optional().isArray(),
  commentController.updateComment
);

router.delete('/comments/:id', commentController.removeComment);
