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
    const data = handleError(req.originalUrl, 'BAD_REQUEST', errors.array());
    res.status(data.status).send(data);
    return;
  }

  const { email, password } = req.body as Pick<User, 'email' | 'password'>;

  login(email, password)
    .then((userData) => {
      const status = StatusCodes.ACCEPTED;
      console.log(userData, status);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: MS_IN_A_MONTH, httpOnly: true });
      res.status(status).send(userData);
    })
    .catch((e) => {
      let data;
      if (e instanceof Error && e.message in ReasonPhrases) {
        data = handleError(req.originalUrl, e.message as keyof typeof ReasonPhrases);
      } else {
        data = handleError(req.originalUrl);
      }
      res.status(data.status).send(data);
      next(e);
    });
};
