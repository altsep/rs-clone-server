import { Handler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { db } from '../../../db';
import { handleError, Options } from '../../utils';

export const getUser: Handler = (req, res, next) => {
  const { id } = req.params;
  const { users } = db;

  if (id == null) {
    const message = ReasonPhrases.BAD_REQUEST;
    const status = StatusCodes.BAD_REQUEST;
    const errOpts: Options = { req, res, next, message, status };
    handleError(errOpts);
    return;
  }

  const user = users.find((u) => String(u.id) === id);

  if (!user) {
    const message = `User under id ${id} was not found`;
    const status = StatusCodes.NOT_FOUND;
    const errOpts: Options = { req, res, next, message, status };
    handleError(errOpts);
    return;
  }

  const { password, ...userData } = { ...user };

  res.send(userData);
};
