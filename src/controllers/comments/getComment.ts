import { Handler } from 'express';
import { handleError } from '../../utils';
import { getComment } from '../../services/comment/getComment';

export const handleGetComment: Handler = (req, res, next) => {
  const { id } = req.params;

  if (id == null) {
    const data = handleError(req.originalUrl, 400);
    res.status(data.status).send(data);
    return;
  }

  getComment(id)
    .then((post) => res.send(post))
    .catch(next);
};
