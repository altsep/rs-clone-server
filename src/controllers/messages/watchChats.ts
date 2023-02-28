import { watchChats } from '../../services/messages/watchChats';
import { WsHandler } from './types';

export const handleWatchChats: WsHandler = (ws, payload): void => {
  const { userId } = payload as { userId: number };

  watchChats(ws, userId);
};
