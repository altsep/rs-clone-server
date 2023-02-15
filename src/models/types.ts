import { ObjectId } from 'mongoose';
import { Comment, Message, Post, User } from '../types';

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

type IMessageSchema = Message & {
  id: string;
  _id: ObjectId;
  createdAt: string;
};

interface IChatSchema {
  id: string;
  _id: ObjectId;
  userIds: number[];
  createdAt: string;
  messages: Message[];
}

export {
  TUserSchema as UserSchema,
  ITokenSchema as TokenSchema,
  TPostSchema as PostSchema,
  TCommentSchema as CommentSchema,
  IMessageSchema as MessageSchema,
  IChatSchema as ChatSchema,
};
