import { body } from 'express-validator';
import { app } from '../app';
import { RESERVED_PAGE_NAMES } from '../constants';
import { usersController } from '../controllers/users';

app.get('/api/users', usersController.getUsers);

app.post(
  '/api/users',
  body('email').isEmail().exists().isString(),
  body('password').exists().isStrongPassword({ minSymbols: 0 }),
  body('name').exists().isString(),
  body('country').exists().isString(),
  body('birthDate').exists().isString(),
  usersController.addUser
);

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
