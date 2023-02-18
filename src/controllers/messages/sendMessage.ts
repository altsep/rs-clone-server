import { sendMessage } from '../../services/messages/sendMessage';
import { Message } from '../../types';
import { getActionString } from '../../utils';
import { WsHandler } from './types';

export const handleSendMessage: WsHandler = async (ws, payload) => {
  const { chatId, userId, description } = payload as { chatId: string } & Exclude<Message, 'id'>;

  const message = await sendMessage(chatId, userId, description);

  const res = getActionString('send', message);

  ws.send(res);
};
