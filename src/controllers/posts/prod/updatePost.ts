import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { db } from '../../../db';
import { Post } from '../../../types';
import { handleError } from '../../../utils';

export const updatePost: Handler = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const data = handleError(req.originalUrl, 400, errors.array());
    res.status(data.status).send(data);
    return;
  }

  const { id } = req.params;
  const postProps = req.body as Partial<Post>;

  const { posts } = db;
  const post = posts.find((p) => String(p.id) === id);

  if (!post) {
    const data = handleError(req.originalUrl, 404);
    res.status(data.status).send(data);
    return;
  }

  const updatedPost: Post = { ...post, ...postProps };

  const i = posts.indexOf(post);

  db.posts[i] = updatedPost;

  res.send(updatedPost);
};
