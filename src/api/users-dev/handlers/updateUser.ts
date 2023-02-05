import { Handler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { db } from '../../../db';
import { User } from '../../../types';
import { handleError, hasWrongKeys, ErrorHandlerOptions } from '../../utils';

const allowedKeys: (keyof User<number>)[] = [
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
  const userProps = req.body as Partial<User<number>>;

  const wrongKeys = hasWrongKeys(userProps, allowedKeys);
  const incorrectData = !userProps || wrongKeys;

  if (incorrectData) {
    const message = ReasonPhrases.BAD_REQUEST;
    const status = StatusCodes.BAD_REQUEST;
    const errOpts: ErrorHandlerOptions = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  const { users } = db;
  const user = users.find((u) => String(u.id) === id);

  if (!user) {
    const message = ReasonPhrases.NOT_FOUND;
    const status = StatusCodes.NOT_FOUND;
    const errOpts: ErrorHandlerOptions = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  if (userProps.email) {
    const exists = !!users.find((u) => u.email === userProps.email);

    if (exists) {
      const message = `User already exists`;
      const errOpts: ErrorHandlerOptions = { req, res, message };
      handleError(errOpts);
      return;
    }
  }

  const updatedUser: User<number> = { ...user, ...userProps };

  const i = users.indexOf(user);

  db.users[i] = updatedUser;

  res.send(updatedUser);
};
