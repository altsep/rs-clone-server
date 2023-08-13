import { body } from 'express-validator';
import { postController } from '../controllers/post-controller';
import { router } from '../router';

router.get('/posts', postController.getAllPosts);

router.post(
  '/posts',
  body('userId').exists().isNumeric(),
  body('description').exists().isString(),
  postController.addPost
);

router.get('/posts/:id', postController.getPost);

router.patch(
  '/posts/:id',
  body('description').optional().isString(),
  body('likes').optional().isNumeric(),
  body('likedUserIds').optional().isArray(),
  body('commentsIds').optional().isArray(),
  postController.updatePost
);

router.delete('/posts/:id', postController.removePost);
