import { WebsocketRequestHandler } from 'express-ws';
import { getActionString } from '../../utils';
import { WsHandler } from './types';
import { handleSendMessage as send } from './sendMessage';
import { handleWatchChats as watch } from './watchChats';
import { handleUserOnlineStatus as userStatus } from './handleOnlineStatus';
import { handleRemoveAllChatMessages as removeAllChatMessages } from './removeAllChatMessages';
import { ping } from './ping';

export const messagesWsController: Record<string, WsHandler> = {
  send,
  watch,
  userStatus,
  ping,
};

export const messagesController = {
  removeAllChatMessages,
};

const handleMessages: WebsocketRequestHandler = (ws, _req, _next) => {
  ws.on('message', (message: string) => {
    const { type, payload } = JSON.parse(message) as { type: keyof typeof messagesWsController; payload: unknown };

    if (!Object.hasOwn(messagesWsController, type)) {
      const errMessage = `Incorrect WS message type. Requested "${type}".`;
      const err = new Error(errMessage);
      const res = getActionString('error', { error: true, message: errMessage });
      ws.send(res);
      console.error(err.message);
      return;
    }

    const handler = messagesWsController[type];

    let res;

    try {
      res = handler(ws, payload);
    } catch (e) {
      console.error('Sync WS handler threw:', e);
    }

    if (res instanceof Promise) {
      res.catch((e) => console.error('Async WS handler threw:', e));
    }
  });

  ws.on('error', (err) => {
    console.error('WS errored:', err);
  });

  ws.on('close', (code, reason) => {
    console.log('WS closed:', code, reason.toString());
  });
};

export { handleMessages };
