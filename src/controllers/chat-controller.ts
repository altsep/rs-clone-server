/* eslint-disable class-methods-use-this */
import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { addChat } from '../services/chat/addChat';
import { getUserChats } from '../services/chat/getUserChats';
import { removeChat } from '../services/chat/removeChat';
import { Util } from '../util/Util';

class ChatController {
  public addChat: Handler = (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const data = Util.handleError(req.originalUrl, 400, errors.array());
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

  public getAllUserChats: Handler = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const data = Util.handleError(req.originalUrl, 400, errors.array());
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

  public removeChat: Handler = (req, res, next): void => {
    const isValid = Util.handleValidationResult(req, res);

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
}

export const chatController = new ChatController();
