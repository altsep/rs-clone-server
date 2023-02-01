import { Handler } from 'express';
import { app } from '../../../app';
import { db } from '../../../db';
import { User } from '../../../types';
import { handleError } from '../utils';

const { users } = db;

const patchUserHandler: Handler = (req, res, next) => {
  const { id } = req.params;
  const newUserInfo = req.body as Partial<User>;

  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    const message = `User under id ${id} does not exist`;
    return handleError(req, res, next, message, 404);
  }

  const updatedUser: User = { ...user, ...newUserInfo };

  const i = users.indexOf(user);

  db.users[i] = updatedUser;

  res.send(updatedUser);

  return undefined;
};

app.patch('/api/users/:id', patchUserHandler);
