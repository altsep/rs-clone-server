import { Handler } from 'express';
import { removeComment } from '../../services/comment/removeComment';

export const handleRemoveComment: Handler = (req, res, next) => {
  const { originalUrl } = req;
  const { id } = req.params;

  removeComment(id)
    .then(() => {
      const data = { success: true, instance: originalUrl };
      res.send(data);
    })
    .catch(next);
};
