import { NextFunction, Request } from 'express';
import { WebSocket } from 'ws';
import { app } from '../app';

type WsHandler = (ws: WebSocket, payload: unknown) => void;

const wsHandlers: Record<string, WsHandler> = {};

const sendStringified = (ws: WebSocket, type: string, payload: unknown): void =>
  ws.send(JSON.stringify({ type, payload }));

const wsHandler = (ws: WebSocket, _req: Request, next: NextFunction): void => {
  ws.on('message', (message: string) => {
    const { type, payload } = JSON.parse(message) as { type: keyof typeof wsHandlers; payload: unknown };

    if (!(type in wsHandlers)) {
      const errMessage = `Incorrect WS message type. Requested ${message}`;
      const err = new Error(errMessage);
      sendStringified(ws, 'error', err);
      next(errMessage);
      return;
    }

    const handler = wsHandlers[type];
    handler(ws, payload);

    // Check ws connection
    // sendStringified(ws, 'system', 'Connected to WebSocket server');
    // console.log('received: %s', message);
    // sendStringified(ws, 'system', `You sent the following: "${message}"`);
  });

  ws.on('error', (err) => {
    sendStringified(ws, 'error', { message: err });
    next(err);
  });
};

app.ws('/', wsHandler);
