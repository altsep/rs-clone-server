interface Comment {
  id: number;
  userId: number;
  description: string;
  createdAt: number;
  likes: number;
}

interface Post {
  id: number;
  userId: number;
  description: string;
  createdAt: number;
  likes: number;
  commentsIds?: number[];
}

interface User {
  id: number;
  name: string;
  alias?: string;
  country?: string;
  avatarURL?: string;
  postsIds?: number[];
  friendsIds?: number[];
}

export { Comment, Post, User };
