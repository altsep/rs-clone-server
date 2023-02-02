import { Handler } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { ALLOWED_POST_KEYS } from '../../../constants';
import { db } from '../../../db';
import { Post } from '../../../types';
import { handleError, hasKeysMissing, hasWrongKeys, Options } from '../../utils';

export const addPost: Handler = (req, res) => {
  const postProps = req.body as Exclude<Post, 'id'>;

  const keysMissing = hasKeysMissing(postProps, ALLOWED_POST_KEYS);
  const wrongKeys = hasWrongKeys(postProps, ALLOWED_POST_KEYS);
  const incorrectData = keysMissing || wrongKeys;

  if (incorrectData) {
    const message = ReasonPhrases.BAD_REQUEST;
    const status = StatusCodes.BAD_REQUEST;
    const errOpts: Options = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  const { posts } = db;
  const lastPostId = posts[posts.length - 1].id;

  const newPostProps: Pick<Post, 'id' | 'likes'> = {
    id: lastPostId != null ? lastPostId + 1 : 1,
    likes: 0,
  };

  const newPost = { ...newPostProps, ...postProps };

  posts.push(newPost);

  const status = StatusCodes.CREATED;

  res.status(status).send(newPost);
};
