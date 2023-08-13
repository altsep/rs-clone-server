/* eslint-disable class-methods-use-this */
import { ChatDto } from '../dtos/chat-dto';
import { chatModel } from '../models/chat-model';

class ChatService {
  public addChat = async (userIds: number[]): Promise<ChatDto> => {
    const chat = await chatModel.findOne({ userIds });

    if (chat) {
      throw new Error('Chat already exists');
    }

    const newChat = await chatModel.create({ userIds });

    const chatDto = new ChatDto(newChat);

    return chatDto;
  };

  public getUserChats = async (userId: number): Promise<ChatDto[]> => {
    const chats = (await chatModel.find({ userIds: userId })) ?? [];

    const chatDtos = chats.map((c) => new ChatDto(c));

    return chatDtos;
  };

  public removeChat = async (id: string): Promise<void> => {
    const chat = await chatModel.findByIdAndDelete(id);

    if (!chat) {
      throw new Error('Not found');
    }
  };
}

export const chatService = new ChatService();
