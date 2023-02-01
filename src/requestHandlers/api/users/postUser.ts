import { Handler } from 'express';
import { app } from '../../../app';
import { db } from '../../../db';
import { User } from '../../../types';
import { handleError } from '../utils';

const { users } = db;

const postUserHandler: Handler = (req, res, next) => {
  const body = req.body as Partial<User>;
  const { name } = body;

  if (!name) {
    const message = 'Incorrect request body';
    return handleError(req, res, next, message);
  }

  const exists = users.findIndex((u) => u.name === name) !== -1;

  if (exists) {
    const message = `User ${name} exists`;
    return handleError(req, res, next, message);
  }

  const newUser = { id: users.length + 1, name, ...body };

  users.push(newUser);

  res.send(newUser);

  return undefined;
};

app.post('/api/users', postUserHandler);
