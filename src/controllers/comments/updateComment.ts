import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { updateComment } from '../../services/comment/updateComment';
import { Comment } from '../../types';
import { handleError } from '../../utils';

export const handleUpdateComment: Handler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const data = handleError(req.originalUrl, 400, errors.array());
    res.status(data.status).send(data);
    return;
  }

  const { id } = req.params;
  const postProps = req.body as Partial<Comment>;

  updateComment(id, postProps)
    .then((updatedComment) => res.send(updatedComment))
    .catch((e) => next(e));
};
