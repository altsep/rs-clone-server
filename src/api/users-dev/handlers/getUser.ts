import { Handler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { db } from '../../../db';
import { handleError, ErrorHandlerOptions } from '../../utils';

export const getUser: Handler = (req, res) => {
  const { id } = req.params;
  const { users } = db;

  if (id == null) {
    const message = ReasonPhrases.BAD_REQUEST;
    const status = StatusCodes.BAD_REQUEST;
    const errOpts: ErrorHandlerOptions = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  const user = users.find((u) => String(u.id) === id);

  if (!user) {
    const message = ReasonPhrases.NOT_FOUND;
    const status = StatusCodes.NOT_FOUND;
    const errOpts: ErrorHandlerOptions = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  const { password, ...userData } = { ...user };

  res.send(userData);
};
