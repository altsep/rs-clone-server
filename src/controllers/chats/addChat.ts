import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { handleError } from '../../utils';
import { addChat } from '../../services/chat/addChat';

export const handleAddChat: Handler = (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const data = handleError(req.originalUrl, 400, errors.array());
      res.status(data.status).send(data);
      return;
    }

    const { userIds } = req.body as { userIds: number[] };
    const uniqueUserIds = [...new Set(userIds)];

    if (uniqueUserIds.length === 1) {
      throw new Error("Chat can't have one member");
    }

    addChat(uniqueUserIds)
      .then((chatData) => {
        const status = StatusCodes.CREATED;
        res.status(status).send(chatData);
      })
      .catch(next);
  } catch (e) {
    next(e);
  }
};
