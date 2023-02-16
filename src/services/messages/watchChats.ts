import { ChangeStreamUpdateDocument } from 'mongodb';
import { WebSocket } from 'ws';
import { MessageDto } from '../../dtos/message-dto';
import { chatModel } from '../../models/chat-model';
import { ChatSchema } from '../../models/types';
import { User } from '../../types';
import { getActionString } from '../../utils';
import { validateAccessToken } from '../token/validateAccessToken';

export const watchChats = (ws: WebSocket, userId: number, accessToken: string): void => {
  const userData = validateAccessToken(accessToken) as User<number>;

  if (!userData || userData.id !== userId) {
    throw new Error('Unauthorized');
  }

  const validatedMsg = getActionString('system', 'User authenticated. Watching for chat updates...');

  ws.send(validatedMsg);

  const changeStream = chatModel.watch([], { fullDocument: 'updateLookup', hydrate: true });

  changeStream.on('change', (change: ChangeStreamUpdateDocument<ChatSchema>) => {
    const chat = change.fullDocument;

    if (chat) {
      const { userIds } = chat;
      const { messages } = chat;

      if (userIds.includes(userId)) {
        const lastMessage = messages[messages.length - 1];
        const lastMessageDto = new MessageDto(lastMessage);
        const message = getActionString('watch', lastMessageDto);
        ws.send(message);
      }
    }
  });
};
