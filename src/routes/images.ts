import { param, query } from 'express-validator';
import { app } from '../app';
import { imagesController } from '../controllers/images';
import { upload } from '../middlewares/upload-middleware';

app.post('/api/images/post-img/:id', param('id').isNumeric(), upload.single('post-img'), imagesController.uploadImage);

app.get('/api/images?', query('name').isAlpha(), query('id').isNumeric(), imagesController.getImage);

app.post(
  '/api/images/user-avatar/:id',
  param('id').isNumeric(),
  upload.single('user-avatar'),
  imagesController.uploadImage
);

app.get('/api/images?', query('name').isAlpha(), query('id').isNumeric(), imagesController.getImage);

app.post(
  '/api/images/user-cover/:id',
  param('id').isNumeric(),
  upload.single('user-cover'),
  imagesController.uploadImage
);

app.get('/api/images?', query('name').isAlpha(), query('id').isNumeric(), imagesController.getImage);
