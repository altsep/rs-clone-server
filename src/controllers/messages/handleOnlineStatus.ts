import { setLastSeen } from '../../services/messages/setLastSeen';
import { setUserOnlineStatus } from '../../services/messages/setUserOnlineStatus';
import { WsHandler } from './types';

export const handleUserOnlineStatus: WsHandler = async (_ws, payload): Promise<void> => {
  const { userId, isOnline } = payload as { userId: number; isOnline: boolean };
  await setUserOnlineStatus(userId, isOnline);
  if (!isOnline) await setLastSeen(userId);
};
