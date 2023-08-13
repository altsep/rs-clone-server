/* eslint-disable class-methods-use-this */
import { ChangeStreamUpdateDocument } from 'mongodb';
import WebSocket from 'ws';
import { MessageDto } from '../dtos/message-dto';
import { UserDto } from '../dtos/user-dto';
import { chatModel } from '../models/chat-model';
import { MessageSchema, ChatSchema } from '../models/types';
import { userModel } from '../models/user-model';
import { Util } from '../util/Util';

class MessageService {
  public sendMessage = async (id: string, userId: number, description: string): Promise<MessageDto> => {
    const chat = await chatModel.findById(id);

    if (!chat) {
      throw new Error('Not found');
    }

    const newMessageData = { userId, description } as MessageSchema;

    const len = chat.messages.push(newMessageData);

    await chat.save();

    const message = chat.messages[len - 1];

    return new MessageDto(message);
  };

  public setLastSeen = async (userId: number): Promise<UserDto> => {
    const user = await userModel.findOne({ userId });

    if (!user) {
      throw new Error('Not found');
    }

    user.lastSeen = Util.getIsoString();

    await user.save();

    const userDto = new UserDto(user);

    return userDto;
  };

  public setUserOnlineStatus = async (userId: number, status: boolean): Promise<UserDto> => {
    const user = await userModel.findOne({ userId });

    if (!user) {
      throw new Error('Not found');
    }

    user.isOnline = status;

    await user.save();

    const userDto = new UserDto(user);

    return userDto;
  };

  public watchChats = async (ws: WebSocket, userId: number): Promise<void> => {
    const user = await userModel.findOne({ userId });

    if (!user) {
      throw new Error('Not Found');
    }

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
            const message = Util.getActionString('watch', lastMessageDto);
            ws.send(message);
          }
        }
      }
    });
  };

  public removeAllChatMessages = async (id: string): Promise<void> => {
    const chat = await chatModel.findById(id);

    if (!chat) {
      throw new Error('Not found');
    }

    chat.messages = [];

    await chat.save();
  };
}

export const messageService = new MessageService();
