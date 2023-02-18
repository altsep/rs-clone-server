import { ChatDto } from '../../dtos/chat-dto';
import { chatModel } from '../../models/chat-model';

export const addChat = async (userIds: number[]): Promise<ChatDto> => {
  const chat = await chatModel.findOne({ userIds });

  if (chat) {
    throw new Error('Chat already exists');
  }

  const newChat = await chatModel.create({ userIds });

  const chatDto = new ChatDto(newChat);

  return chatDto;
};
