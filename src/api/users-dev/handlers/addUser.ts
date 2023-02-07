import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../../db';
import { User } from '../../../types';
import { handleError } from '../../utils';

export const addUser: Handler = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const data = handleError(req.originalUrl, 'BAD_REQUEST', errors.array());
    res.status(data.status).send(data);
    return;
  }

  const userProps = req.body as User;
  const { email } = userProps;

  const { users } = db;
  const exists = users.findIndex((u) => u.email === email) !== -1;

  if (exists) {
    const message = 'User already exists';
    const data = handleError(req.originalUrl);
    data.message = message;
    res.status(data.status).send(data);
    return;
  }

  const newUserProps: Pick<User, 'id' | 'hidden'> = {
    id: users.length + 1,
    hidden: false,
  };

  const newUser: User = { ...newUserProps, ...userProps };

  users.push(newUser);

  const status = StatusCodes.CREATED;

  res.status(status).send(newUser);
};
