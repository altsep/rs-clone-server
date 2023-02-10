import { Handler } from 'express';
import { db } from '../../../db';
import { handleError } from '../../../utils';

export const getPost: Handler = (req, res) => {
  const { id } = req.params;

  if (id == null) {
    const data = handleError(req.originalUrl, 400);
    res.status(data.status).send(data);
    return;
  }

  const { posts } = db;

  const post = posts.find((p) => String(p.id) === id);

  if (!post) {
    const data = handleError(req.originalUrl, 404);
    res.status(data.status).send(data);
    return;
  }

  res.send(post);
};
