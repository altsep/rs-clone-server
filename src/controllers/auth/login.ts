import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { MS_IN_A_MONTH } from '../../constants';
import { login } from '../../services/user/login';
import { User } from '../../types';
import { handleError } from '../../utils';

export const handleLogin: Handler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const data = handleError(req.originalUrl, 400, errors.array());
    res.status(data.status).send(data);
    return;
  }

  const { email, password } = req.body as Pick<User, 'email' | 'password'>;

  login(email, password)
    .then((userData) => {
      const status = StatusCodes.ACCEPTED;
      res.cookie('refreshToken', userData.refreshToken, { maxAge: MS_IN_A_MONTH, httpOnly: true });
      res.status(status).send(userData);
    })
    .catch((e) => next(e));
};
