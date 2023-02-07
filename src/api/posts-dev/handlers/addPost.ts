import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../../db';
import { Post } from '../../../types';
import { handleError } from '../../utils';

export const addPost: Handler = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const data = handleError('BAD_REQUEST', req.originalUrl, errors.array());
    res.status(data.status).end(data);
  }

  const postProps = req.body as Exclude<Post<number>, 'id'>;

  const { posts } = db;
  const lastPostId = posts[posts.length - 1].postId;

  const newPostProps: Pick<Post<number>, 'postId' | 'likes'> = {
    postId: lastPostId != null ? lastPostId + 1 : 1,
    likes: 0,
  };

  const newPost = { ...newPostProps, ...postProps };

  posts.push(newPost);

  const status = StatusCodes.CREATED;

  res.status(status).send(newPost);
};
