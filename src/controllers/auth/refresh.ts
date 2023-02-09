import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MS_IN_A_MONTH } from '../../constants';
import { refresh } from '../../services/user/refresh';
import { handleError } from '../../utils';

export const handleRefresh: Handler = (req, res, next) => {
  const { refreshToken } = req.cookies as { refreshToken?: string };

  if (!refreshToken) {
    const data = handleError(req.originalUrl, 401);
    res.status(data.status).send(data);
    return;
  }

  refresh(refreshToken)
    .then((userData) => {
      res.clearCookie('refreshToken');
      const status = StatusCodes.OK;
      res.cookie('refreshToken', userData.refreshToken, { maxAge: MS_IN_A_MONTH, httpOnly: true });
      res.status(status).send(userData);
    })
    .catch((e) => {
      next(e);
    });
};
