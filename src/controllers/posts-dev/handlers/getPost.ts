import { Handler } from 'express';
import { db } from '../../../db';
import { handleError } from '../../../utils';

export const getPost: Handler = (req, res) => {
  const { id } = req.params;

  if (id == null) {
    const data = handleError(req.originalUrl, 'BAD_REQUEST');
    res.status(data.status).send(data);
    return;
  }

  const { posts } = db;

  const post = posts.find((p) => String(p.id) === id);

  if (!post) {
    const data = handleError(req.originalUrl, 'NOT_FOUND');
    res.status(data.status).send(data);
    return;
  }

  res.send(post);
};
