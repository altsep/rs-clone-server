import { Handler } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { db } from '../../../db';
import { User } from '../../../types';
import { handleError, Options } from '../../utils';

export const authUser: Handler = (req, res) => {
  const { email, password } = req.body as Pick<User, 'password' | 'email'>;
  const { originalUrl } = req;
  const { users } = db;

  const user = users.find((u) => u.email === email);

  if (!user) {
    const message = ReasonPhrases.NOT_FOUND;
    const status = StatusCodes.NOT_FOUND;
    const errOpts: Options = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  if (password !== user.password) {
    const message = `Incorrect password`;
    const status = StatusCodes.UNAUTHORIZED;
    const errOpts: Options = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  const status = StatusCodes.ACCEPTED;
  const message = ReasonPhrases.ACCEPTED;
  const data = { success: true, message, instance: originalUrl };

  res.status(status).send(data);
};
