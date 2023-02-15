import { ObjectId } from 'mongoose';
import { Comment, Post, User } from '../types';

interface ITokenSchema {
  user: ObjectId;
  refreshToken: string;
}

interface IActivation {
  activationLink: string;
  isActivated: boolean;
}

interface IUserId {
  _id: ObjectId;
  userId: number;
}

type TUserSchema = User<string> & IActivation & IUserId;

interface IPostId {
  _id: ObjectId;
  postId: number;
}

type TPostSchema = Post<string> & IPostId;

interface ICommentId {
  _id: ObjectId;
  commentId: number;
}

type TCommentSchema = Comment<string> & ICommentId;

interface IMessageSchema {
  _id: ObjectId;
  description: string;
  userId: number;
  createdAt: string;
}

interface IChatSchema {
  id: string;
  _id: ObjectId;
  userIds: number[];
  createdAt: string;
  messages: IMessageSchema[];
}

export {
  TUserSchema as UserSchema,
  ITokenSchema as TokenSchema,
  TPostSchema as PostSchema,
  TCommentSchema as CommentSchema,
  IMessageSchema as MessageSchema,
  IChatSchema as ChatSchema,
};
