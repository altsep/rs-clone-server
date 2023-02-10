import { Handler } from 'express';
import { getPost } from '../../../services/post/getPost';
import { handleError } from '../../../utils';

export const handleGetPost: Handler = (req, res, next) => {
  const { id } = req.params;

  if (id == null) {
    const data = handleError(req.originalUrl, 400);
    res.status(data.status).send(data);
    return;
  }

  getPost(id)
    .then((post) => res.send(post))
    .catch((e) => next(e));
};
