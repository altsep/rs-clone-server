interface IComment {
  commentId: number;
  postId: number;
  userId: string;
  description: string;
  createdAt: string;
  likes: number;
  likedUserIds?: number[];
}

interface IPost<T> {
  postId: number;
  userId: T;
  description: string;
  createdAt: string;
  likes: number;
  likedUserIds?: number[];
  commentsIds?: number[];
}

interface IUser<T> {
  userId?: T;
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
