import { Handler } from 'express';
import { db } from '../../../db';
import { User } from '../../../types';
import { handleError } from '../../../utils';

export const hideUser: Handler = (req, res) => {
  const { id } = req.params;
  const { password } = req.body as Pick<User, 'password'>;
  const { users } = db;

  if (id == null || password == null) {
    const data = handleError(req.originalUrl, 400);
    res.status(data.status).send(data);
    return;
  }

  const user = users.find((u) => String(u.id) === id);

  if (!user) {
    const data = handleError(req.originalUrl, 404);
    res.status(data.status).send(data);
    return;
  }

  if (password !== user.password) {
    const message = 'Incorrect password';
    const data = handleError(req.originalUrl, 400);
    data.message = message;
    res.status(data.status).send(data);
    return;
  }

  user.hidden = true;

  res.send(user);
};
