import { Handler } from 'express';
import { db } from '../../../db';
import { handleError, Options } from '../../utils';

export const getUser: Handler = (req, res, next) => {
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
