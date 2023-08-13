/* eslint-disable class-methods-use-this */
import { Handler } from 'express';
import { matchedData, validationResult } from 'express-validator';
import { MS_IN_A_MONTH } from '../constants';
import { UserSchema } from '../models/types';
import { userService } from '../services/user-service';
import { User } from '../types';
import { Util } from '../util/Util';

class UserController {
  public getUser: Handler = (req, res, next) => {
    const { id } = req.params;

    userService
      .getUser(id)
      .then((userData) => res.send(userData))
      .catch(next);
  };

  public getAllUsers: Handler = (_req, res, next) => {
    userService
      .getAllUsers()
      .then((users) => res.send(users))
      .catch(next);
  };

  public changePassword: Handler = (req, res, next) => {
    const { refreshToken } = req.cookies as { refreshToken?: string };

    if (!refreshToken) {
      throw new Error('Unauthorized');
    }

    const errors = validationResult(req);
    const { userId, password } = req.body as Pick<UserSchema, 'userId' | 'password'>;

    if (!errors.isEmpty()) {
      const data = Util.handleError(req.originalUrl, 400, errors.array());
      res.status(data.status).send(data);
      return;
    }

    userService
      .changePassword(userId, password, refreshToken)
      .then((userData) => {
        res.cookie('refreshToken', userData.refreshToken, { maxAge: MS_IN_A_MONTH, httpOnly: true });
        res.send(userData);
      })
      .catch(next);
  };

  public updateUser: Handler = (req, res, next) => {
    const { refreshToken } = req.cookies as { refreshToken?: string };

    if (!refreshToken) {
      throw new Error('Unauthorized');
    }

    const allData = matchedData(req);
    const errors = validationResult(req);
    const { id } = req.params;

    if (Object.hasOwn(allData, 'password') || !errors.isEmpty() || /\D/.test(id)) {
      const data = Util.handleError(req.originalUrl, 400, errors.array());
      res.status(data.status).send(data);
      return;
    }

    const data = req.body as Partial<User>;

    userService
      .updateUser(Number(id), data, refreshToken)
      .then((userData) => res.send(userData))
      .catch(next);
  };

  public deleteUser: Handler = (req, res, next) => {
    const { refreshToken } = req.cookies as { refreshToken?: string };

    if (!refreshToken) {
      throw new Error('Unauthorized');
    }

    const errors = validationResult(req);
    const { id } = req.params;
    const { password } = req.body as Pick<User, 'password'>;

    if (/\D/.test(id) || !errors.isEmpty()) {
      const data = Util.handleError(req.originalUrl, 400, errors.array());
      res.status(data.status).send(data);
      return;
    }

    userService
      .deleteUser(Number(id), password, refreshToken)
      .then(() => {
        res.clearCookie('refreshToken');
        res.end();
      })
      .catch(next);
  };
}

export const userController = new UserController();
