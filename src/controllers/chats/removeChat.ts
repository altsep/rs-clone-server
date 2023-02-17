import { Handler } from 'express';
import { removeChat } from '../../services/messages/removeChat';
import { handleValidationResult } from '../../utils';

export const handleRemoveChat: Handler = (req, res, next): void => {
  const isValid = handleValidationResult(req, res);

  if (!isValid) {
    return;
  }

  const { id } = req.params;

  removeChat(id)
    .then(() => {
      res.end();
    })
    .catch((e) => next(e));
};
