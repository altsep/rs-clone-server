import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../../db';
import { Post } from '../../../types';
import { generateHexStr, handleError } from '../../utils';

export const addPost: Handler = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const data = handleError(req.originalUrl, 'BAD_REQUEST', errors.array());
    res.status(data.status).send(data);
    return;
  }

  const postProps = req.body as Exclude<Post, 'id'>;

  const { posts } = db;

  const newPostProps: Pick<Post, 'id' | 'likes'> = {
    id: generateHexStr(),
    likes: 0,
  };

  const newPost = { ...newPostProps, ...postProps };

  posts.push(newPost);

  const status = StatusCodes.CREATED;

  res.status(status).send(newPost);
};
