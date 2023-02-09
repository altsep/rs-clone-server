import { ObjectId } from 'mongoose';
import { User } from '../types';

interface ITokenSchema {
  user: ObjectId;
  refreshToken: string;
}

interface IActivation {
  activationLink: string;
  isActivated: boolean;
}

interface IId {
  _id: ObjectId;
  id: string;
  userId: number;
}

type TUserSchema = Exclude<User, 'id'> & IActivation & IId;

export { TUserSchema as UserSchema, ITokenSchema as TokenSchema };
