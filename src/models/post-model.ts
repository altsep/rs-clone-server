import { Schema, model } from 'mongoose';
import { imageSchema } from './common';
import { PostSchema } from './types';
import { setCreatedAt } from './utils';

const postSchema = new Schema<PostSchema>({
  postId: {
    type: Number,
    unique: true,
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
  commentsIds: [{ type: Number }],
  images: [imageSchema],
});

postSchema.pre('validate', setCreatedAt);

const postModel = model('Post', postSchema);

export { postModel };
