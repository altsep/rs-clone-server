import { MessageDto } from '../../dtos/message-dto';
import { chatModel } from '../../models/chat-model';
import { MessageSchema } from '../../models/types';

export const sendMessage = async (id: string, userId: number, description: string): Promise<MessageDto> => {
  const chat = await chatModel.findById(id);

  if (!chat) {
    throw new Error('Not found');
  }

  const len = chat.messages.push({ userId, description });

  await chat.save();

  const message = chat.messages[len - 1] as MessageSchema;

  return new MessageDto(message);
};
