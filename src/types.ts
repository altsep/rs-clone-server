interface Message {
  description: string;
  userId: number;
}

interface Comment<T = number> {
  id: T;
  postId: number;
  userId: number;
  description: string;
  createdAt: string;
  likes: number;
  likedUserIds?: number[];
}

interface Post<T = number> {
  id: T;
  userId: number;
  description: string;
  createdAt: string;
  likes: number;
  likedUserIds?: number[];
  commentsIds?: number[];
}

interface User<T = number> {
  id: T;
  email?: string;
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
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

type ResponseData = { user: User } & Tokens;

export { Comment, Message, Post, User, Tokens, ResponseData };
