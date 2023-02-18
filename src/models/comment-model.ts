import { Schema, model } from 'mongoose';
import { CommentSchema } from './types';
import { setCreatedAt } from './utils';

const commentSchema = new Schema<CommentSchema>({
  commentId: {
    type: Number,
    unique: true,
    immutable: true,
  },
  postId: {
    type: Number,
    required: true,
    immutable: true,
  },
  userId: {
    type: Number,
    required: true,
    immutable: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
    immutable: true,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  likedUserIds: [{ type: Number }],
});

commentSchema.pre('validate', setCreatedAt);

const commentModel = model('Comment', commentSchema);

export { commentModel };
