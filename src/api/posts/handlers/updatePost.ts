import { Handler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ALLOWED_POST_KEYS } from '../../../constants';
import { db } from '../../../db';
import { Post } from '../../../types';
import { handleError, hasWrongKeys, Options } from '../../utils';

export const updatePost: Handler = (req, res) => {
  const { id } = req.params;
  const postProps = req.body as Partial<Post>;

  const wrongKeys = hasWrongKeys(postProps, ALLOWED_POST_KEYS);
  const incorrectData = !postProps || wrongKeys;

  if (incorrectData) {
    const message = ReasonPhrases.BAD_REQUEST;
    const status = StatusCodes.BAD_REQUEST;
    const errOpts: Options = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  const { posts } = db;
  const post = posts.find((u) => String(u.id) === id);

  if (!post) {
    const message = ReasonPhrases.NOT_FOUND;
    const status = StatusCodes.NOT_FOUND;
    const errOpts: Options = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  const updatedPost: Post = { ...post, ...postProps };

  const i = posts.indexOf(post);

  db.posts[i] = updatedPost;

  res.send(updatedPost);
};
