/* eslint-disable class-methods-use-this */
import { Handler } from 'express';
import { WebsocketRequestHandler } from 'express-ws';
import WebSocket from 'ws';
import { messageService } from '../services/message-service';
import { Message } from '../types';
import { Util } from '../util/Util';

export type WsHandler = (ws: WebSocket, payload?: unknown) => void | Promise<void>;

class MessageController {
  private handleUserOnlineStatus: WsHandler = async (_ws, payload): Promise<void> => {
    const { userId, isOnline } = payload as { userId: number; isOnline: boolean };
    await messageService.setUserOnlineStatus(userId, isOnline);
    if (!isOnline) await messageService.setLastSeen(userId);
  };

  private ping = (ws: WebSocket): void => {
    const pingMsg = Util.getActionString('ping', 'pong');
    ws.send(pingMsg);
  };

  private send: WsHandler = async (ws, payload) => {
    const { chatId, userId, description } = payload as { chatId: string } & Exclude<Message, 'id'>;

    const message = await messageService.sendMessage(chatId, userId, description);

    const res = Util.getActionString('send', message);

    ws.send(res);
  };

  private watch: WsHandler = (ws, payload): void => {
    const { userId } = payload as { userId: number };

    messageService.watchChats(ws, userId).catch(console.error);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handleMessages: WebsocketRequestHandler = (ws, _req, _next) => {
    ws.on('message', (message: string) => {
      const { type, payload } = JSON.parse(message) as { type: keyof typeof messageController; payload: unknown };

      if (this[type] == null) {
        const errMessage = `Incorrect WS message type. Requested "${type}".`;
        const err = new Error(errMessage);
        const res = Util.getActionString('error', { error: true, message: errMessage });
        ws.send(res);
        console.error(err.message);
        return;
      }

      const handler = this[type] as WsHandler;

      let res;

      try {
        res = handler(ws, payload);
      } catch (e) {
        console.error('Sync WS handler:', e);
      }

      if (res instanceof Promise) {
        res.catch((e) => console.error('Async WS handler:', e));
      }
    });

    ws.on('error', (err) => {
      console.error('WS errored:', err);
    });

    ws.on('close', (code, reason) => {
      console.log('WS closed:', code, reason.toString());
    });
  };

  public removeAllChatMessages: Handler = (req, res, next): void => {
    const isValid = Util.handleValidationResult(req, res);

    if (!isValid) {
      return;
    }

    const { id } = req.params;

    messageService
      .removeAllChatMessages(id)
      .then(() => {
        res.end();
      })
      .catch(next);
  };
}

export const messageController = new MessageController();
