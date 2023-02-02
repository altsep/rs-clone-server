import { Handler } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { db } from '../../../db';
import { User } from '../../../types';
import { handleError, Options } from '../../utils';

export const addUser: Handler = (req, res, next) => {
  const body = req.body as Partial<Exclude<User, 'id'>>;
  const { name, password, birthDate, createdAt, country } = body;
  const { users } = db;

  const missingProps = [name, password, birthDate, createdAt, country].some((p) => p == null);

  if (missingProps) {
    const message = ReasonPhrases.BAD_REQUEST;
    const status = StatusCodes.BAD_REQUEST;
    const errOpts: Options = { req, res, next, message, status };
    handleError(errOpts);
    return;
  }

  const exists = users.findIndex((u) => u.name === name) !== -1;

  if (name && exists) {
    const message = `User "${name}" exists`;
    const errOpts: Options = { req, res, next, message };
    handleError(errOpts);
    return;
  }

  const newUserProps = {
    id: users.length + 1,
    hidden: false,
  };

  const newUser = { ...newUserProps, ...body };

  users.push(newUser);

  const status = StatusCodes.CREATED;

  res.status(status).send(newUser);
};
