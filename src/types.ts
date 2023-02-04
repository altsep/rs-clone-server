interface ITokenSchema {
  user: IUser<string>;
  refreshToken: string;
}

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

interface IActivation {
  activationLink: string;
  isActivated: boolean;
}

type TUserSchema = Exclude<IUser<string>, 'id'> & IActivation;

interface IComment {
  userId: string;
  postId: number;
  id: number;
  description: string;
  createdAt: string;
  likes: number;
}

interface IPost<T> {
  userId: T;
  id: number;
  description: string;
  createdAt: string;
  likes: number;
  commentsIds?: number[];
}

interface IUser<T> {
  id?: T;
  email: string;
  name: string;
  password: string;
  hidden: boolean;
  createdAt: string;
  country: string;
  birthDate: string;
  alias?: string;
  avatarURL?: string;
  postsIds?: number[];
  friendsIds?: number[];
}

export {
  ITokens as Tokens,
  TUserSchema as UserSchema,
  ITokenSchema as TokenSchema,
  IComment as Comment,
  IPost as Post,
  IUser as User,
};
