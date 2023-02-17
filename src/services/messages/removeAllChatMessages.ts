import { chatModel } from '../../models/chat-model';

export const removeAllChatMessages = async (id: string): Promise<void> => {
  const chat = await chatModel.findById(id);

  if (!chat) {
    throw new Error('Not found');
  }

  chat.messages = [];

  await chat.save();
};
