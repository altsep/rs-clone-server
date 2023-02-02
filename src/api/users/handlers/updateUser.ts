import { Handler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { db } from '../../../db';
import { User } from '../../../types';
import { handleError, hasWrongKeys, Options } from '../../utils';

const allowedKeys: (keyof User)[] = [
  'email',
  'name',
  'password',
  'alias',
  'birthDate',
  'country',
  'avatarURL',
  'postsIds',
  'friendsIds',
];

export const updateUser: Handler = (req, res) => {
  const { id } = req.params;
  const userProps = req.body as Partial<User>;

  const wrongKeys = hasWrongKeys(userProps, allowedKeys);
  const incorrectData = !userProps || wrongKeys;

  if (incorrectData) {
    const message = ReasonPhrases.BAD_REQUEST;
    const status = StatusCodes.BAD_REQUEST;
    const errOpts: Options = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  const { users } = db;
  const user = users.find((u) => String(u.id) === id);

  if (!user) {
    const message = ReasonPhrases.NOT_FOUND;
    const status = StatusCodes.NOT_FOUND;
    const errOpts: Options = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  if (userProps.email) {
    const exists = !!users.find((u) => u.email === userProps.email);

    if (exists) {
      const message = `User already exists`;
      const errOpts: Options = { req, res, message };
      handleError(errOpts);
      return;
    }
  }

  const updatedUser: User = { ...user, ...userProps };

  const i = users.indexOf(user);

  db.users[i] = updatedUser;

  res.send(updatedUser);
};
