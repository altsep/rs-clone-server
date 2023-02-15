import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { addPost } from '../../services/post/addPost';
import { handleError } from '../../utils';
import type { Post } from '../../types';

export const handleAddPost: Handler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const data = handleError(req.originalUrl, 400, errors.array());
    res.status(data.status).send(data);
    return;
  }

  const postProps = req.body as Exclude<Post, 'id'>;

  addPost(postProps)
    .then((newPost) => {
      const status = StatusCodes.CREATED;
      res.status(status).send(newPost);
    })
    .catch((e) => next(e));
};
