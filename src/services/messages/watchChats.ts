import { ChangeStreamUpdateDocument } from 'mongodb';
import { WebSocket } from 'ws';
import { MessageDto } from '../../dtos/message-dto';
import { chatModel } from '../../models/chat-model';
import { ChatSchema } from '../../models/types';
import { getActionString } from '../../utils';

export const watchChats = (ws: WebSocket, userId: number): void => {
  const validatedMsg = getActionString('system', 'User authenticated. Watching for chat updates...');

  ws.send(validatedMsg);

  const changeStream = chatModel.watch([], { fullDocument: 'updateLookup', hydrate: true });

  changeStream.on('change', (change: ChangeStreamUpdateDocument<ChatSchema>) => {
    const chat = change.fullDocument;

    if (chat) {
      const { userIds } = chat;
      const { messages } = chat;

      if (userIds.includes(userId) && messages.length) {
        const lastMessage = messages[messages.length - 1];

        if (lastMessage.userId !== userId) {
          const lastMessageDto = new MessageDto(lastMessage);
          const message = getActionString('watch', lastMessageDto);
          ws.send(message);
        }
      }
    }
  });
};
