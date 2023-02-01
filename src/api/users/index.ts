import { app } from '../../app';
import { getUser } from './handlers/getUser';
import { getUsers } from './handlers/getUsers';
import { addUser } from './handlers/addUser';
import { updateUser } from './handlers/updateUser';
import { hideUser } from './handlers/hideUser';

app.get('/api/users/:id', getUser);

app.get('/api/users', getUsers);

app.post('/api/users', addUser);

app.patch('/api/users/:id', updateUser);

app.delete('/api/users/:id', hideUser);
