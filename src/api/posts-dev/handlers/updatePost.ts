import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { db } from '../../../db';
import { Post } from '../../../types';
import { handleError } from '../../utils';

export const updatePost: Handler = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const data = handleError('BAD_REQUEST', req.originalUrl, errors.array());
    res.status(data.status).send(data);
    return;
  }

  const { postId } = req.params;
  const postProps = req.body as Partial<Post<number>>;

  const { posts } = db;
  const post = posts.find((u) => String(u.postId) === postId);

  if (!post) {
    const data = handleError('NOT_FOUND', req.originalUrl);
    res.status(data.status).send(data);
    return;
  }

  const updatedPost: Post<number> = { ...post, ...postProps };

  const i = posts.indexOf(post);

  db.posts[i] = updatedPost;

  res.send(updatedPost);
};
