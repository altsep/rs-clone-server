import { Handler } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { db } from '../../../db';
import { User } from '../../../types';
import { handleError } from '../../../utils';

export const authUser: Handler = (req, res) => {
  const { email, password } = req.body as Pick<User, 'password' | 'email'>;
  const { originalUrl } = req;
  const { users } = db;

  const user = users.find((u) => u.email === email);

  if (!user) {
    const data = handleError(originalUrl, 'NOT_FOUND');
    res.status(data.status).send(data);
    return;
  }

  if (password !== user.password) {
    const message = `Incorrect password`;
    const data = handleError(originalUrl, 'UNAUTHORIZED');
    data.message = message;
    res.status(data.status).send(data);
    return;
  }

  const status = StatusCodes.ACCEPTED;
  const message = ReasonPhrases.ACCEPTED;
  const data = { success: true, message, instance: originalUrl };

  res.status(status).send(data);
};
