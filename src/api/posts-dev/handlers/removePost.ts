import { Handler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { db } from '../../../db';
import { User } from '../../../types';
import { handleError, ErrorHandlerOptions } from '../../utils';

export const removePost: Handler = (req, res) => {
  const { originalUrl } = req;
  const { id } = req.params;
  const { password } = req.body as Pick<User<number>, 'password'>;

  if (password == null) {
    const message = ReasonPhrases.BAD_REQUEST;
    const status = StatusCodes.BAD_REQUEST;
    const errOpts: ErrorHandlerOptions = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  const { posts, users } = db;
  const post = posts.find((p) => String(p.id) === id);
  const user = post && users.find((u) => u.id === post.userId);

  if (!post || !user) {
    const message = ReasonPhrases.NOT_FOUND;
    const status = StatusCodes.NOT_FOUND;
    const errOpts: ErrorHandlerOptions = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  if (password !== user.password) {
    const message = ReasonPhrases.UNAUTHORIZED;
    const status = StatusCodes.UNAUTHORIZED;
    const errOpts: ErrorHandlerOptions = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  db.posts = posts.filter((p) => String(p.id) !== id);

  const status = StatusCodes.ACCEPTED;
  const message = ReasonPhrases.ACCEPTED;
  const data = { success: true, message, instance: originalUrl };

  res.status(status).send(data);
};
