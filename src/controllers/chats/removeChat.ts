import { Handler } from 'express';
import { removeChat } from '../../services/chat/removeChat';
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
    .catch(next);
};
