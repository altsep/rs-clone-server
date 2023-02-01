import { Handler } from 'express';
import { app } from '../../../app';
import { db } from '../../../db';
import { User } from '../../../types';
import { handleError, Options } from '../utils';

const hideUser: Handler = (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body as Pick<User, 'password'>;
  const { users } = db;

  if (password == null) {
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

  if (password !== user.password) {
    const message = `Incorrect password`;
    const status = 401;
    const errOpts: Options = { req, res, next, message, status };
    return handleError(errOpts);
  }

  user.hidden = true;

  res.send(user);

  return undefined;
};

app.delete('/api/users/:id', hideUser);
