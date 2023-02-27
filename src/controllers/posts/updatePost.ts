import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { updatePost } from '../../services/post/updatePost';
import { Post } from '../../types';
import { handleError } from '../../utils';

export const handleUpdatePost: Handler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const data = handleError(req.originalUrl, 400, errors.array());
    res.status(data.status).send(data);
    return;
  }

  const { id } = req.params;
  const postProps = req.body as Partial<Post>;

  updatePost(id, postProps)
    .then((updatedPost) => res.send(updatedPost))
    .catch(next);
};
