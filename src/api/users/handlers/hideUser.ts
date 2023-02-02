import { Handler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { db } from '../../../db';
import { User } from '../../../types';
import { handleError, Options } from '../../utils';

export const hideUser: Handler = (req, res) => {
  const { id } = req.params;
  const { password } = req.body as Pick<User, 'password'>;
  const { users } = db;

  if (password == null) {
    const message = ReasonPhrases.BAD_REQUEST;
    const status = StatusCodes.BAD_REQUEST;
    const errOpts: Options = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  const user = users.find((u) => String(u.id) === id);

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

  user.hidden = true;

  res.send(user);
};
