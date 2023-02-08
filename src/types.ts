interface IComment {
  id: number;
  postId: string;
  userId: number;
  description: string;
  createdAt: string;
  likes: number;
  likedUserIds?: number[];
}

interface IPost {
  id: number;
  userId: number;
  description: string;
  createdAt: string;
  likes: number;
  likedUserIds?: number[];
  commentsIds?: number[];
}

interface IUser {
  id: number;
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
