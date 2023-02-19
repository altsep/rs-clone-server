import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { handleError } from '../../utils';
import type { Comment } from '../../types';
import { addComment } from '../../services/comment/addComment';

export const handleAddComment: Handler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const data = handleError(req.originalUrl, 400, errors.array());
    res.status(data.status).send(data);
    return;
  }

  const data = req.body as Exclude<Comment, 'id'>;

  addComment(data)
    .then((comment) => {
      const status = StatusCodes.CREATED;
      res.status(status).send(comment);
    })
    .catch(next);
};
