interface IComment {
  id: number;
  userId: number;
  description: string;
  createdAt: string;
  likes: number;
}

interface IPost {
  id: number;
  userId: number;
  description: string;
  createdAt: string;
  likes: number;
  commentsIds?: number[];
}

interface IUser {
  id: number;
  name: string;
  password: string;
  hidden: boolean;
  birthDate: string;
  country: string;
  alias?: string;
  avatarURL?: string;
  postsIds?: number[];
  friendsIds?: number[];
}

export { IComment as Comment, IPost as Post, IUser as User };
