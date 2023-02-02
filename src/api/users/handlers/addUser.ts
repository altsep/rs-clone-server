import { Handler } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { ALLOWED_USER_KEYS } from '../../../constants';
import { db } from '../../../db';
import { User } from '../../../types';
import { handleError, hasWrongKeys, Options } from '../../utils';

export const addUser: Handler = (req, res) => {
  const userProps = req.body as Exclude<User, 'id'>;
  const { name } = userProps;
  const propsMissing = ALLOWED_USER_KEYS.some((k) => !Object.hasOwn(userProps, k));
  const wrongKeys = hasWrongKeys(userProps, ALLOWED_USER_KEYS);
  const incorrectData = propsMissing || wrongKeys;

  if (incorrectData) {
    const message = ReasonPhrases.BAD_REQUEST;
    const status = StatusCodes.BAD_REQUEST;
    const errOpts: Options = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  const { users } = db;
  const exists = users.findIndex((u) => u.name === name) !== -1;

  if (exists) {
    const message = `User "${name}" exists`;
    const errOpts: Options = { req, res, message };
    handleError(errOpts);
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
