import { Handler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { db } from '../../../db';
import { handleError } from '../../utils';

export const removePost: Handler = (req, res) => {
  const { originalUrl } = req;
  const { id: postId } = req.params;

  const { posts, users } = db;
  const post = posts.find((p) => String(p.postId) === postId);
  const user = post && users.find((u) => u.userId === post.userId);

  if (!post || !user) {
    const data = handleError('NOT_FOUND', originalUrl);
    res.status(data.status).send(data);
    return;
  }

  db.posts = posts.filter((p) => String(p.postId) !== postId);

  const status = StatusCodes.ACCEPTED;
  const message = ReasonPhrases.ACCEPTED;
  const data = { success: true, message, instance: originalUrl };

  res.status(status).send(data);
};
