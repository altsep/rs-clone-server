import { Handler } from 'express';
import { app } from '../../../app';
import { db } from '../../../db';
import { handleError, Options } from '../utils';

const getUser: Handler = (req, res, next) => {
  const { id } = req.params;
  const { users } = db;

  if (id == null) {
    const message = 'Bad request';
    const status = 400;
    const errOpts: Options = { req, res, next, message, status };
    return handleError(errOpts);
  }

  const user = users.find((u) => String(u.id) === id);

  if (!user) {
    const message = `User under id ${id} was not found`;
    const status = 404;
    const errOpts: Options = { req, res, next, message, status };
    return handleError(errOpts);
  }

  const userData = { ...user, password: undefined };

  res.send(userData);

  return undefined;
};

app.get('/api/users/:id', getUser);
