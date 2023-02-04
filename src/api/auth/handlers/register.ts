import { Handler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { MS_IN_A_MONTH } from '../../../constants';
import { register } from '../../../services/user/register';
import { User } from '../../../types';
import { hasKeysMissing, hasWrongKeys, ErrorHandlerOptions, handleError, getIsoString } from '../../utils';

const allowedKeys: (keyof User<string>)[] = ['email', 'name', 'password', 'alias', 'birthDate', 'country'];
const requiredKeys: (keyof User<string>)[] = ['email', 'password'];

export const handleRegistration: Handler = (req, res, next): void => {
  const userProps = req.body as Exclude<User<string>, 'id'>;

  const wrongKeys = hasWrongKeys(userProps, allowedKeys);
  const keysMissing = hasKeysMissing(userProps, requiredKeys);
  const incorrectData = wrongKeys || keysMissing;

  if (incorrectData) {
    const message = ReasonPhrases.BAD_REQUEST;
    const status = StatusCodes.BAD_REQUEST;
    const errOpts: ErrorHandlerOptions = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  const newUserProps: Pick<User<string>, 'hidden' | 'createdAt'> = {
    hidden: false,
    createdAt: getIsoString(Date.now()),
  };

  Object.assign(userProps, newUserProps);

  register(userProps)
    .then((userData) => {
      const status = StatusCodes.CREATED;
      res.cookie('refreshToken', userData.refreshToken, { maxAge: MS_IN_A_MONTH, httpOnly: true });
      res.status(status).send(userData);
    })
    .catch((e) => {
      const message = (e instanceof Error && e.message) || '';
      handleError({ req, res, message });
      next(e);
    });
};
