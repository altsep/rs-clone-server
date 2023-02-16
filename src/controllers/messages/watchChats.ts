import { watchChats } from '../../services/messages/watchChats';
import { WsHandler } from './types';

export const handleWatchChats: WsHandler = (ws, payload): void => {
  const { userId, accessToken } = payload as { userId: number; accessToken: string };

  watchChats(ws, userId, accessToken);
};
