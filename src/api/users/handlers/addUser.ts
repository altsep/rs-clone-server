import { Handler } from 'express';
import { db } from '../../../db';
import { User } from '../../../types';
import { handleError, Options } from '../../utils';

export const addUser: Handler = (req, res, next) => {
  const body = req.body as Partial<User>;
  const { name, password, birthDate, country } = body;
  const { users } = db;

  if (!name || !password) {
    const message = 'Bad request';
    const status = 400;
    const errOpts: Options = { req, res, next, message, status };
    return handleError(errOpts);
  }

  const exists = users.findIndex((u) => u.name === name) !== -1;

  if (exists) {
    const message = `User ${name} exists`;
    const errOpts: Options = { req, res, next, message };
    return handleError(errOpts);
  }

  const newUser = { id: users.length + 1, name, password, hidden: false, birthDate, country, ...body };

  users.push(newUser);

  res.send(newUser);

  return undefined;
};
