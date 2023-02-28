import { WebSocket } from 'ws';
import { getActionString } from '../../utils';

export const ping = (ws: WebSocket): void => {
  const pingMsg = getActionString('ping', 'pong');
  ws.send(pingMsg);
};
