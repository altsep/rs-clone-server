import { Handler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { db } from '../../../mock-db';
import { handleError } from '../../../utils';

export const removePost: Handler = (req, res) => {
  const { originalUrl } = req;
  const { id } = req.params;

  const { posts, users } = db;
  const post = posts.find((p) => String(p.id) === id);
  const user = post && users.find((u) => u.id === post.userId);

  if (!post || !user) {
    const data = handleError(originalUrl, 404);
    res.status(data.status).send(data);
    return;
  }

  db.posts = posts.filter((p) => String(p.id) !== id);

  const status = StatusCodes.ACCEPTED;
  const message = ReasonPhrases.ACCEPTED;
  const data = { success: true, message, instance: originalUrl };

  res.status(status).send(data);
};
