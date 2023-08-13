/* eslint-disable class-methods-use-this */
import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { MS_IN_A_MONTH } from '../constants';
import { User } from '../types';
import { Util } from '../util/Util';
import { authService } from '../services/auth-service';

class AuthController {
  public register: Handler = (req, res, next): void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const data = Util.handleError(req.originalUrl, 400, errors.array());
      res.status(data.status).send(data);
    }

    const userProps = req.body as Exclude<User, 'id'>;

    authService
      .register(userProps)
      .then((userData) => {
        const status = StatusCodes.CREATED;
        res.cookie('refreshToken', userData.refreshToken, { maxAge: MS_IN_A_MONTH, httpOnly: true });
        res.status(status).send(userData);
      })
      .catch(next);
  };

  public activate: Handler = (req, res, next) => {
    const { link: activationLink } = req.params;

    authService
      .activate(activationLink)
      .then(() => res.redirect(process.env.CLIENT_URL || ''))
      .catch(next);
  };

  public login: Handler = (req, res, next) => {
    const errors = validationResult(req);

    const { email, password } = req.body as Pick<User, 'email' | 'password'>;

    if (email == null || !errors.isEmpty()) {
      const data = Util.handleError(req.originalUrl, 400, errors.array());
      res.status(data.status).send(data);
      return;
    }

    authService
      .login(email, password)
      .then((userData) => {
        const status = StatusCodes.ACCEPTED;
        res.cookie('refreshToken', userData.refreshToken, { maxAge: MS_IN_A_MONTH, httpOnly: true });
        res.status(status).send(userData);
      })
      .catch(next);
  };

  public refresh: Handler = (req, res, next) => {
    const { refreshToken } = req.cookies as { refreshToken?: string };

    if (!refreshToken) {
      const data = Util.handleError(req.originalUrl, 401);
      res.status(data.status).send(data);
      return;
    }

    authService
      .refresh(refreshToken)
      .then((userData) => {
        res.clearCookie('refreshToken');
        const status = StatusCodes.OK;
        res.cookie('refreshToken', userData.refreshToken, { maxAge: MS_IN_A_MONTH, httpOnly: true });
        res.status(status).send(userData);
      })
      .catch(next);
  };

  public logout: Handler = (req, res, next) => {
    const { refreshToken } = req.cookies as { refreshToken?: string };

    if (!refreshToken) {
      const data = Util.handleError(req.originalUrl, 400);
      res.status(data.status).send(data);
      return;
    }

    authService
      .logout(refreshToken)
      .then((deleteResult) => {
        res.clearCookie('refreshToken');
        const status = StatusCodes.OK;
        const data = { ...deleteResult, instance: req.originalUrl };
        res.status(status).send(data);
      })
      .catch(next);
  };
}

export const authController = new AuthController();
