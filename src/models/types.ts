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

interface IImageSchema {
  data: Buffer;
  contentType: string;
}

interface IUserId {
  _id: ObjectId;
  userId: number;
  deleted: boolean;
}

interface IUserImages {
  images: {
    avatar: IImageSchema;
    cover: IImageSchema;
  };
}

type TUserSchema = User<string> & IActivation & IUserId & IUserImages;

interface IPostId {
  _id: ObjectId;
  postId: number;
}

interface IPostImages {
  images: IImageSchema[];
}

type TPostSchema = Post<string> & IPostId & IPostImages;

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
  messages: IMessageSchema[];
}

export {
  IUserImages as UserImages,
  TUserSchema as UserSchema,
  ITokenSchema as TokenSchema,
  TPostSchema as PostSchema,
  TCommentSchema as CommentSchema,
  IMessageSchema as MessageSchema,
  IChatSchema as ChatSchema,
  IImageSchema as ImageSchema,
};
