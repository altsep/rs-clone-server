import { Handler } from 'express';
import { getUser } from '../../../services/user/getUser';
import { handleError } from '../../../utils';

export const handleGetUser: Handler = (req, res, next) => {
  const { id } = req.params;

  getUser(id)
    .then((userData) => {
      res.send(userData);
    })
    .catch((e) => {
      if (e instanceof Error) {
        const data =
          e.message === 'Not Found' ? handleError(req.originalUrl, 'NOT_FOUND') : handleError(req.originalUrl);
        res.status(data.status).send(data);
        next(e);
      }
    });
};
