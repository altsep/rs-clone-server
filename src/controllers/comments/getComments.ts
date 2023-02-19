import { Handler } from 'express';
import { getAllComments } from '../../services/comment/getAllComments';

export const getComments: Handler = (_req, res, next) => {
  getAllComments()
    .then((posts) => res.send(posts))
    .catch(next);
};
