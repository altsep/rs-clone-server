import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { db } from '../../../db';
import { handleError } from '../../utils';

export const getPost: Handler = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const data = handleError('BAD_REQUEST', req.originalUrl, errors.array());
    res.status(data.status).end(data);
  }
  const { posts } = db;

  const { id: postId } = req.params;

  const post = posts.find((p) => String(p.postId) === postId);

  if (!post) {
    const data = handleError('NOT_FOUND', req.originalUrl);
    res.status(data.status).end(data);
  }

  res.send(post);
};
