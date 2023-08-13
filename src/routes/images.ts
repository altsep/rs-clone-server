import { param, query } from 'express-validator';
import { imageController } from '../controllers/image-controller';
import { upload } from '../middlewares/upload-middleware';
import { router } from '../router';

router.post('/images/post/:id', param('id').isNumeric(), upload.array('post-img', 10), imageController.uploadImage);

router.post(
  '/images/user-avatar/:id',
  param('id').isNumeric(),
  upload.single('user-avatar'),
  imageController.uploadImage
);

router.get(
  '/images?',
  query('name').isAlpha(undefined, { ignore: '-' }),
  query('id').isNumeric(),
  imageController.getImage
);

router.post(
  '/images/user-cover/:id',
  param('id').isNumeric(),
  upload.single('user-cover'),
  imageController.uploadImage
);
