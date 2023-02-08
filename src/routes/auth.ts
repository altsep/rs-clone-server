import { body } from 'express-validator';
import { app } from '../app';
import { handleActivation } from '../controllers/auth/activate';
import { login } from '../controllers/auth/login';
import { logout } from '../controllers/auth/logout';
import { refresh } from '../controllers/auth/refresh';
import { handleRegistration } from '../controllers/auth/register';

if (process.env.MODE === 'dev') {
  app.post(
    '/api/registration',
    body('email').isEmail().exists(),
    body('password').exists(),
    body('name').exists(),
    body('country').exists(),
    body('birthDate').exists(),
    handleRegistration
  );

  app.post('/api/login', login);

  app.post('/api/logout', logout);

  app.get('/api/activate/:link', handleActivation);

  app.get('/api/refresh', refresh);
}
