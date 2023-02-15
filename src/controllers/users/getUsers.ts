import { Handler } from 'express';
import { getAllUsers } from '../../services/user/getAllUsers';

export const getUsers: Handler = (_req, res, next) => {
  getAllUsers()
    .then((users) => res.send(users))
    .catch((e) => next(e));
};
