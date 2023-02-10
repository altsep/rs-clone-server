import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logout } from '../../services/user/logout';
import { handleError } from '../../utils';

export const handleLogout: Handler = (req, res, next) => {
  const { refreshToken } = req.cookies as { refreshToken?: string };

  if (!refreshToken) {
    const data = handleError(req.originalUrl, 400);
    res.status(data.status).send(data);
    return;
  }

  logout(refreshToken)
    .then((deleteResult) => {
      res.clearCookie('refreshToken');
      const status = StatusCodes.OK;
      const data = { ...deleteResult, instance: req.originalUrl };
      res.status(status).send(data);
    })
    .catch((e) => next(e));
};
