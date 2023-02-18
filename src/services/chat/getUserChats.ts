import { ChatDto } from '../../dtos/chat-dto';
import { chatModel } from '../../models/chat-model';

export const getUserChats = async (userId: number): Promise<ChatDto[]> => {
  const chats = await chatModel.find({ userIds: userId });

  if (!chats.length) {
    throw new Error('Not found');
  }

  const chatDtos = chats.map((c) => new ChatDto(c));

  return chatDtos;
};
