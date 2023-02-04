import { Handler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { db } from '../../../db';
import { handleError, ErrorHandlerOptions } from '../../utils';

export const getPost: Handler = (req, res) => {
  const { id } = req.params;
  const { posts } = db;

  if (id == null) {
    const message = ReasonPhrases.BAD_REQUEST;
    const status = StatusCodes.BAD_REQUEST;
    const errOpts: ErrorHandlerOptions = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  const post = posts.find((p) => String(p.id) === id);

  if (!post) {
    const message = ReasonPhrases.NOT_FOUND;
    const status = StatusCodes.NOT_FOUND;
    const errOpts: ErrorHandlerOptions = { req, res, message, status };
    handleError(errOpts);
    return;
  }

  res.send(post);
};
