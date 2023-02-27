import { body } from 'express-validator';
import { app } from '../app';
import { handleActivation } from '../controllers/auth/activate';
import { handleLogin } from '../controllers/auth/login';
import { handleLogout } from '../controllers/auth/logout';
import { handleRefresh } from '../controllers/auth/refresh';
import { handleRegistration } from '../controllers/auth/register';

app.post(
  '/api/registration',
  body('email').isEmail().normalizeEmail(),
  body('password').isString().notEmpty(),
  body('name').isString(),
  body('country').isString(),
  body('birthDate').isISO8601(),
  handleRegistration
);

app.post('/api/login', body('email').isEmail().normalizeEmail(), body('password').isString().notEmpty(), handleLogin);

app.post('/api/logout', handleLogout);

app.get('/api/activate/:link', handleActivation);

app.post('/api/refresh', handleRefresh);
