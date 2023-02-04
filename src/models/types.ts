import { User } from '../types';

interface ITokenSchema {
  user: User<string>;
  refreshToken: string;
}

interface IActivation {
  activationLink: string;
  isActivated: boolean;
}

type TUserSchema = Exclude<User<string>, 'id'> & IActivation;

export { TUserSchema as UserSchema, ITokenSchema as TokenSchema };
