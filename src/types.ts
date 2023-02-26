interface IMessage {
  description: string;
  userId: number;
}

interface IComment<T = number> {
  id: T;
  postId: number;
  userId: number;
  description: string;
  createdAt: string;
  likes: number;
  likedUserIds?: number[];
}

interface IPost<T = number> {
  id: T;
  userId: number;
  description: string;
  createdAt: string;
  likes: number;
  likedUserIds?: number[];
  commentsIds?: number[];
}

interface IUser<T = number> {
  id: T;
  email: string;
  name: string;
  password: string;
  hidden: boolean;
  createdAt: string;
  country: string;
  birthDate: string;
  alias?: string;
  postsIds?: number[];
  friendsIds?: number[];
  pendingFriendsIds?: number[];
  isOnline: boolean;
  lastSeen?: string;
  images: {
    avatar: string;
    cover: string;
  };
}

export { IMessage as Message, IComment as Comment, IPost as Post, IUser as User };
