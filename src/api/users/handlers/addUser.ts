import { Handler } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { db } from '../../../db';
import { User } from '../../../types';
import { handleError, hasKeysMissing, hasWrongKeys, Options } from '../../utils';

const allowedKeys: (keyof User)[] = ['email', 'name', 'password', 'alias', 'birthDate', 'country'];
const requiredKeys: (keyof User)[] = ['email', 'password'];

export const addUser: Handler = (req, res) => {
  const userProps = req.body as Exclude<User, 'id'>;
  const { email } = userProps;

  const wrongKeys = hasWrongKeys(userProps, allowedKeys);
  const keysMissing = hasKeysMissing(userProps, requiredKeys);
  const incorrectData = keysMissing || wrongKeys;

  if (incorrectData) {
    const message = ReasonPhrases.BAD_REQUEST;
    const status = StatusCodes.BAD_REQUEST;
    const errOpts: Options = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  const { users } = db;
  const exists = users.findIndex((u) => u.email === email) !== -1;

  if (exists) {
    const message = 'User already exists';
    const errOpts: Options = { req, res, message };
    handleError(errOpts);
    return;
  }

  const newUserProps: Pick<User, 'id' | 'hidden' | 'createdAt'> = {
    id: users.length + 1,
    hidden: false,
    createdAt: new Date(Date.now()).toISOString(),
  };

  const newUser: User = { ...newUserProps, ...userProps };

  users.push(newUser);

  const status = StatusCodes.CREATED;

  res.status(status).send(newUser);
};
