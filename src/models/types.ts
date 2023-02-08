import { User } from '../types';

interface ITokenSchema {
  user: User;
  refreshToken: string;
}

interface IActivation {
  activationLink: string;
  isActivated: boolean;
}

interface IId {
  userId: number;
}

type TUserSchema = Exclude<User, 'id'> & IActivation & IId;

export { TUserSchema as UserSchema, ITokenSchema as TokenSchema };
