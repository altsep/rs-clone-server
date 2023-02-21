import { body, param } from 'express-validator';
import { app } from '../app';
import { RESERVED_PAGE_NAMES } from '../constants';
import { imagesController } from '../controllers/images';
import { usersController } from '../controllers/users';
import { upload } from '../middlewares/upload-middleware';

app.get('/api/users', usersController.getUsers);

app.get('/api/users/:id', usersController.getUser);

app.patch(
  '/api/users/:id',
  body('email').optional().isEmail(),
  body('name').optional().isString(),
  body('password').optional().isString(),
  body('alias').optional().isString().not().isIn(RESERVED_PAGE_NAMES),
  body('birthDate').optional().isString(),
  body('country').optional().isString(),
  body('avatarURL').optional().isString(),
  body('postsIds').optional().isArray(),
  body('friendsIds').optional().isArray(),
  body('pendingFriendsIds').optional().isArray(),
  usersController.updateUser
);

app.patch(
  '/api/users-pwd',
  body('userId').isNumeric(),
  body('password').isString().notEmpty(),
  usersController.changePassword
);

app.delete('/api/users/:id', body('password').isString().notEmpty(), usersController.deleteUser);
