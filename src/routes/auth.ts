import { body } from 'express-validator';
import { app } from '../app';
import { handleActivation } from '../controllers/auth/activate';
import { handleLogin } from '../controllers/auth/login';
import { handleLogout } from '../controllers/auth/logout';
import { refresh } from '../controllers/auth/refresh';
import { handleRegistration } from '../controllers/auth/register';

app.post(
  '/api/registration',
  body('email').isEmail().exists(),
  body('password').exists(),
  body('name').exists(),
  body('country').exists(),
  body('birthDate').exists(),
  handleRegistration
);

app.post('/api/login', body('email').isEmail().exists(), body('password').exists(), handleLogin);

app.post('/api/logout', handleLogout);

app.get('/api/activate/:link', handleActivation);

app.get('/api/refresh', refresh);
