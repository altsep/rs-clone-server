import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { MS_IN_A_MONTH } from '../../../constants';
import { register } from '../../../services/user/register';
import { User } from '../../../types';
import { handleError } from '../../utils';

export const handleRegistration: Handler = (req, res, next): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const data = handleError(req.originalUrl, 'BAD_REQUEST', errors.array());
    res.status(data.status).end(data);
  }

  const userProps = req.body as Exclude<User, 'id'>;

  register(userProps)
    .then((userData) => {
      const status = StatusCodes.CREATED;
      res.cookie('refreshToken', userData.refreshToken, { maxAge: MS_IN_A_MONTH, httpOnly: true });
      res.status(status).send(userData);
    })
    .catch((e) => {
      next(e);
    });
};
