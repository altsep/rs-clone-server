import { Handler } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { db } from '../../../db';
import { Post } from '../../../types';
import { handleError, hasKeysMissing, hasWrongKeys, ErrorHandlerOptions } from '../../utils';

const allowedKeys: (keyof Post<number>)[] = ['userId', 'description', 'createdAt'];

export const addPost: Handler = (req, res) => {
  const postProps = req.body as Exclude<Post<number>, 'id'>;

  const keysMissing = hasKeysMissing(postProps, allowedKeys);
  const wrongKeys = hasWrongKeys(postProps, allowedKeys);
  const incorrectData = keysMissing || wrongKeys;

  if (incorrectData) {
    const message = ReasonPhrases.BAD_REQUEST;
    const status = StatusCodes.BAD_REQUEST;
    const errOpts: ErrorHandlerOptions = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  const { posts } = db;
  const lastPostId = posts[posts.length - 1].id;

  const newPostProps: Pick<Post<number>, 'id' | 'likes'> = {
    id: lastPostId != null ? lastPostId + 1 : 1,
    likes: 0,
  };

  const newPost = { ...newPostProps, ...postProps };

  posts.push(newPost);

  const status = StatusCodes.CREATED;

  res.status(status).send(newPost);
};
