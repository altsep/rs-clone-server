import { Handler } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { db } from '../../../db';
import { User } from '../../../types';
import { handleError, hasKeysMissing, hasWrongKeys, Options } from '../../utils';

const allowedUserKeys: (keyof User)[] = ['name', 'password', 'alias', 'birthDate', 'country', 'createdAt'];

export const addUser: Handler = (req, res) => {
  const userProps = req.body as Exclude<User, 'id'>;
  const { name } = userProps;

  const keysMissing = hasKeysMissing(userProps, allowedUserKeys);
  const wrongKeys = hasWrongKeys(userProps, allowedUserKeys);
  const incorrectData = keysMissing || wrongKeys;

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
