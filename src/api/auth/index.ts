import { body } from 'express-validator';
import { app } from '../../app';
import { handleActivation } from './handlers/activate';
import { login } from './handlers/login';
import { logout } from './handlers/logout';
import { refresh } from './handlers/refresh';
import { handleRegistration } from './handlers/register';

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
