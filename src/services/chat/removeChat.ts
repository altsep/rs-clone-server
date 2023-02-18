import { chatModel } from '../../models/chat-model';

export const removeChat = async (id: string): Promise<void> => {
  const chat = await chatModel.findByIdAndDelete(id);

  if (!chat) {
    throw new Error('Not found');
  }
};
