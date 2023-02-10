import { Schema, model } from 'mongoose';
import { getIsoString } from '../utils';
import { PostSchema } from './types';

const postSchema = new Schema<PostSchema>({
  postId: {
    type: Number,
    unique: true,
    immutable: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  likedUserIds: [{ type: Number }],
  commentsIds: [{ type: Number }],
});

postSchema.pre('validate', function (next) {
  if (!this.createdAt) {
    this.createdAt = getIsoString();
  }

  next();
});

const postModel = model('Post', postSchema);

export { postModel };
