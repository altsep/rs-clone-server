import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { handleError } from '../../utils';
import { addChat } from '../../services/chat/addChat';

export const handleAddChat: Handler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const data = handleError(req.originalUrl, 400, errors.array());
    res.status(data.status).send(data);
    return;
  }

  const { userIds } = req.body as { userIds: number[] };

  addChat(userIds)
    .then((chatData) => {
      const status = StatusCodes.CREATED;
      res.status(status).send(chatData);
    })
    .catch((e) => next(e));
};
