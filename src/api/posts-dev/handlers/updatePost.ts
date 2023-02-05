import { Handler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { db } from '../../../db';
import { Post } from '../../../types';
import { handleError, hasWrongKeys, ErrorHandlerOptions } from '../../utils';

const allowedKeys: (keyof Post<number>)[] = ['description', 'likes', 'commentsIds'];

export const updatePost: Handler = (req, res) => {
  const { id } = req.params;
  const postProps = req.body as Partial<Post<number>>;

  const wrongKeys = hasWrongKeys(postProps, allowedKeys);
  const incorrectData = !postProps || wrongKeys;

  if (incorrectData) {
    const message = ReasonPhrases.BAD_REQUEST;
    const status = StatusCodes.BAD_REQUEST;
    const errOpts: ErrorHandlerOptions = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  const { posts } = db;
  const post = posts.find((u) => String(u.id) === id);

  if (!post) {
    const message = ReasonPhrases.NOT_FOUND;
    const status = StatusCodes.NOT_FOUND;
    const errOpts: ErrorHandlerOptions = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  const updatedPost: Post<number> = { ...post, ...postProps };

  const i = posts.indexOf(post);

  db.posts[i] = updatedPost;

  res.send(updatedPost);
};
