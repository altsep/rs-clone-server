import { Handler } from 'express';
import { db } from '../../../db';
import { handleError } from '../../../utils';

export const getUser: Handler = (req, res) => {
  const { id } = req.params;
  const { users } = db;

  if (id == null) {
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

  const { password, ...userData } = { ...user };

  res.send(userData);
};
