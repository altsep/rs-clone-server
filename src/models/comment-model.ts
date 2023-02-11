import { Schema, model } from 'mongoose';
import { getIsoString } from '../utils';
import { CommentSchema } from './types';

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

commentSchema.pre('validate', function (next) {
  if (!this.createdAt) {
    this.createdAt = getIsoString();
  }

  next();
});

const commentModel = model('Comment', commentSchema);

export { commentModel };
