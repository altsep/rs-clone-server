import { Handler } from 'express';
import { getUser } from '../../services/user/getUser';

export const handleGetUser: Handler = (req, res, next) => {
  const { id } = req.params;

  getUser(id)
    .then((userData) => res.send(userData))
    .catch((e) => next(e));
};
