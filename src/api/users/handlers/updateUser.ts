import { Handler } from 'express';
import { db } from '../../../db';
import { User } from '../../../types';
import { handleError, Options } from '../../utils';

export const updateUser: Handler = (req, res, next) => {
  const { id } = req.params;
  const newUserInfo = req.body as Partial<User>;
  const { users } = db;

  const user = users.find((u) => String(u.id) === id);

  if (!user) {
    const message = `User under id ${id} was not found`;
    const status = 404;
    const errOpts: Options = { req, res, next, message, status };
    return handleError(errOpts);
  }

  const updatedUser: User = { ...user, ...newUserInfo };

  const i = users.indexOf(user);

  db.users[i] = updatedUser;

  res.send(updatedUser);

  return undefined;
};
