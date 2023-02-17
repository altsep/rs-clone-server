import { WebsocketRequestHandler } from 'express-ws';
import { getActionString } from '../../utils';
import { WsHandler } from './types';
import { handleSendMessage as send } from './sendMessage';
import { handleWatchChats as watch } from './watchChats';
import { handleUserOnlineStatus as userStatus } from './handleOnlineStatus';
import { handleRemoveAllChatMessages as removeAllChatMessages } from './removeAllChatMessages';

export const messagesWsController: Record<string, WsHandler> = {
  send,
  watch,
  userStatus,
};

export const messagesController = {
  removeAllChatMessages,
};

const handleMessages: WebsocketRequestHandler = (ws, _req, next) => {
  ws.on('message', (message: string) => {
    try {
      const { type, payload } = JSON.parse(message) as { type: keyof typeof messagesWsController; payload: unknown };

      if (!Object.hasOwn(messagesWsController, type)) {
        const errMessage = `Incorrect WS message type. Requested "${type}".`;
        const err = new Error(errMessage);
        const res = getActionString('error', { error: true, message: errMessage });
        ws.send(res);
        next(err);
        return;
      }

      const handler = messagesWsController[type];

      const res = handler(ws, payload);

      if (res instanceof Promise) {
        res.catch((e) => next(e));
      }
    } catch (e) {
      next(e);
    }
  });

  ws.on('error', (err) => {
    const res = getActionString('error', { message: err });
    ws.send(res);
    next(err);
  });
};

export { handleMessages };
