import { app } from '../../app';
import { activate } from './handlers/activate';
import { login } from './handlers/login';
import { logout } from './handlers/logout';
import { refresh } from './handlers/refresh';
import { handleRegistration } from './handlers/register';

app.post('/api/registration', handleRegistration);

app.post('/api/login', login);

app.post('/api/logout', logout);

app.get('/api/activate/:link', activate);

app.get('/api/refresh', refresh);
