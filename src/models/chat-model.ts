import { Schema, model } from 'mongoose';
import { ChatSchema, MessageSchema } from './types';
import { setCreatedAt } from './utils';

const messageSchema = new Schema<MessageSchema>({
  description: {
    type: String,
    default: '',
  },
  userId: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: String,
  },
});

const chatSchema = new Schema<ChatSchema>({
  userIds: [{ type: Number }],
  createdAt: {
    type: String,
  },
  messages: [messageSchema],
});

messageSchema.pre('validate', setCreatedAt);
chatSchema.pre('validate', setCreatedAt);

const chatModel = model('Chat', chatSchema);

export { chatModel };
