import { Handler } from 'express';
import { removePost } from '../../../services/post/removePost';

export const handleRemovePost: Handler = (req, res, next) => {
  const { originalUrl } = req;
  const { id } = req.params;

  removePost(id)
    .then(() => {
      const data = { success: true, instance: originalUrl };
      res.send(data);
    })
    .catch((e) => next(e));
};
