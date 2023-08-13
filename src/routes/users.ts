import { body } from 'express-validator';
import { RESERVED_PAGE_NAMES } from '../constants';
import { userController } from '../controllers/user-controller';
import { router } from '../router';

router.get('/users', userController.getAllUsers);

router.get('/users/:id', userController.getUser);

router.patch(
  '/users/:id',
  body('email').optional().isEmail(),
  body(['name', 'password', 'birthDate', 'country', 'avatarURL']).optional().isString(),
  body('alias').optional().isString().not().isIn(RESERVED_PAGE_NAMES),
  body(['postsIds', 'friendsIds', 'pendingFriendsIds']).optional().isArray(),
  userController.updateUser
);

router.patch(
  '/users-pwd',
  body('userId').isNumeric(),
  body('password').isString().notEmpty(),
  userController.changePassword
);

router.delete('/users/:id', body('password').isString().notEmpty(), userController.deleteUser);
