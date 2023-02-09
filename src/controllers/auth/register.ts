import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { MS_IN_A_MONTH } from '../../constants';
import { UserSchema } from '../../models/types';
import { register } from '../../services/user/register';
import { handleError } from '../../utils';

export const handleRegistration: Handler = (req, res, next): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const data = handleError(req.originalUrl, 400, errors.array());
    res.status(data.status).send(data);
  }

  const userProps = req.body as Exclude<UserSchema, 'id'>;

  register(userProps)
    .then((userData) => {
      const status = StatusCodes.CREATED;
      res.cookie('refreshToken', userData.refreshToken, { maxAge: MS_IN_A_MONTH, httpOnly: true });
      res.status(status).send(userData);
    })
    .catch((e) => {
      const data = handleError(req.originalUrl);
      if (e instanceof Error) {
        data.message = e.message;
      }
      res.status(data.status).send(data);
      next(e);
    });
};
