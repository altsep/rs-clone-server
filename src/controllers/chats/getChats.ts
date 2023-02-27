import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { handleError } from '../../utils';
import { getUserChats } from '../../services/chat/getUserChats';

export const handleGetUserChats: Handler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const data = handleError(req.originalUrl, 400, errors.array());
    res.status(data.status).send(data);
    return;
  }

  const { userId } = req.query;

  getUserChats(Number(userId))
    .then((chatList) => {
      res.send(chatList);
    })
    .catch(next);
};
