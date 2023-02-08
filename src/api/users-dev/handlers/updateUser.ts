import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { db } from '../../../db';
import { User } from '../../../types';
import { handleError } from '../../utils';

export const updateUser: Handler = (req, res) => {
  const errors = validationResult(req);
  const { id } = req.params;

  if (id == null || !errors.isEmpty()) {
    const data = handleError(req.originalUrl, 'BAD_REQUEST', errors.array());
    res.status(data.status).end(data);
    return;
  }

  const { users } = db;
  const user = users.find((u) => String(u.id) === id);

  if (!user) {
    const data = handleError(req.originalUrl, 'NOT_FOUND');
    res.status(data.status).send(data);
    return;
  }

  const userProps = req.body as Partial<User>;

  if (userProps.email) {
    const exists = !!users.find((u) => u.email === userProps.email);

    if (exists) {
      const message = 'User already exists';
      const data = handleError(req.originalUrl);
      data.message = message;
      res.status(data.status).send(data);
      return;
    }
  }

  const updatedUser: User = { ...user, ...userProps };

  const i = users.indexOf(user);

  db.users[i] = updatedUser;

  res.send(updatedUser);
};
