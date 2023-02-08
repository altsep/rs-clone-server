import { body } from 'express-validator';
import { app } from '../../app';
import { getUser } from './handlers/getUser';
import { getUsers } from './handlers/getUsers';
import { updateUser } from './handlers/updateUser';
import { hideUser } from './handlers/hideUser';
import { authUser } from './handlers/authUser';
import { addUser } from './handlers/addUser';

if (process.env.MODE === 'dev') {
  app.post(
    '/api/users',
    body('email').isEmail().exists().isString(),
    body('password').exists().isStrongPassword({ minSymbols: 0 }),
    body('name').exists().isString(),
    body('country').exists().isString(),
    body('birthDate').exists().isString(),
    addUser
  );

  app.get('/api/users', getUsers);

  app.get('/api/users/:id', getUser);

  app.patch(
    '/api/users/:id',
    body('email').optional().isEmail(),
    body('name').optional().isString(),
    body('password').optional().isString(),
    body('alias').optional().isString(),
    body('birthDate').optional().isString(),
    body('country').optional().isString(),
    body('avatarURL').optional().isString(),
    body('postsIds').optional().isArray(),
    body('friendsIds').optional().isArray(),
    updateUser
  );

  app.delete('/api/users/:id', hideUser);

  app.get('/api/users-auth', body('email').exists().isEmail(), body('password').exists().isString(), authUser);
}
