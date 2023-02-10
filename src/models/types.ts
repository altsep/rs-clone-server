import { ObjectId } from 'mongoose';
import { Post, User } from '../types';

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

export { TUserSchema as UserSchema, ITokenSchema as TokenSchema, TPostSchema as PostSchema };
