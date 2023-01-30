import { Handler } from 'express';
import { app } from '../../../app';
import { db } from '../../../db';
import { handleError } from '../utils';

const { users } = db;

const getUsersHandler: Handler = (_req, res) => {
  res.send(users);
};

app.get('/api/users', getUsersHandler);

const postUserHandler: Handler = (req, res, next) => {
  const { alias, userName } = req.body as { alias: string; id: number; userName: string };

  if (!userName) {
    const message = 'Incorrect request body';
    return handleError(req, res, next, message);
  }

  const exists = users.findIndex((u) => u.userName === userName) !== -1;

  if (exists) {
    const message = `User ${userName} exists`;
    return handleError(req, res, next, message);
  }

  const newUser = { id: users.length + 1, userName, alias: alias || '' };

  users.push(newUser);

  res.send(newUser);

  return undefined;
};

app.post('/api/users', postUserHandler);

const deleteUserHandler: Handler = (req) => {
  const { param } = req.params;
};

app.delete('/api/users/:param', deleteUserHandler);
