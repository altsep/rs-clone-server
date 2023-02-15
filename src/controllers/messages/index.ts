import { WebsocketRequestHandler } from 'express-ws';
import { getActionString } from '../../utils';
import { WsHandler } from './types';
import { handleSendMessage as send } from './sendMessage';

const messagesController: Record<string, WsHandler> = {
  send,
};

const handleMessages: WebsocketRequestHandler = (ws, _req, next) => {
  ws.on('open', () => {
    getActionString('system', 'Connected to WebSocket server');
  });

  ws.on('message', (message: string) => {
    try {
      const { type, payload } = JSON.parse(message) as { type: keyof typeof messagesController; payload: unknown };

      if (!Object.hasOwn(messagesController, type)) {
        const errMessage = `Incorrect WS message type. Requested "${type}"`;
        const err = new Error(errMessage);
        const res = getActionString('error', { error: true, message: errMessage });
        ws.send(res);
        next(err);
      }

      const handler = messagesController[type];

      handler(ws, payload).catch((e) => next(e));

      // console.log('received: %s', message);
      // const res = getActionString('system', `You sent the following: "${message}"`);
      // ws.send(res);
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
