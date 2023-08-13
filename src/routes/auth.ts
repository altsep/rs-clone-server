import { body } from 'express-validator';
import { authController } from '../controllers/auth-controller';
import { router } from '../router';

router.post(
  '/registration',
  body('email').isEmail().normalizeEmail(),
  body('password').isString().notEmpty(),
  body('name').isString(),
  body('country').isString(),
  body('birthDate').isISO8601(),
  authController.register
);

router.post(
  '/login',
  body('email').isEmail().normalizeEmail(),
  body('password').isString().notEmpty(),
  authController.login
);

router.post('/logout', authController.logout);

router.get('/activate/:link', authController.activate);

router.post('/refresh', authController.refresh);
