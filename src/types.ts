interface IComment {
  userId: string;
  postId: number;
  id: number;
  description: string;
  createdAt: string;
  likes: number;
  likedUserIds?: number[];
}

interface IPost<T> {
  userId: T;
  id: number;
  description: string;
  createdAt: string;
  likes: number;
  likedUserIds?: number[];
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

export { IComment as Comment, IPost as Post, IUser as User };
