import { Handler } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { db } from '../../../db';
import { User } from '../../../types';
import { handleError, hasKeysMissing, hasWrongKeys, ErrorHandlerOptions } from '../../utils';

const allowedKeys: (keyof User<number>)[] = ['email', 'name', 'password', 'alias', 'birthDate', 'country', 'createdAt'];
const requiredKeys: (keyof User<number>)[] = ['email', 'password', 'birthDate', 'country', 'createdAt'];

export const addUser: Handler = (req, res) => {
  const userProps = req.body as Exclude<User<number>, 'id'>;
  const { email } = userProps;

  const wrongKeys = hasWrongKeys(userProps, allowedKeys);
  const keysMissing = hasKeysMissing(userProps, requiredKeys);
  const incorrectData = keysMissing || wrongKeys;

  if (incorrectData) {
    const message = ReasonPhrases.BAD_REQUEST;
    const status = StatusCodes.BAD_REQUEST;
    const errOpts: ErrorHandlerOptions = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  const { users } = db;
  const exists = users.findIndex((u) => u.email === email) !== -1;

  if (exists) {
    const message = 'User already exists';
    const errOpts: ErrorHandlerOptions = { req, res, message };
    handleError(errOpts);
    return;
  }

  const newUserProps: Pick<User<number>, 'id' | 'hidden'> = {
    id: users.length + 1,
    hidden: false,
  };

  const newUser: User<number> = { ...newUserProps, ...userProps };

  users.push(newUser);

  const status = StatusCodes.CREATED;

  res.status(status).send(newUser);
};
