import { PostSchema } from '../models/types';

class PostDto {
  public id: number;

  public userId: number;

  public description: string;

  public createdAt: string;

  public likes: number;

  public likedUserIds: number[];

  public commentsIds: number[];

  public images: string[] | undefined;

  constructor(document: PostSchema) {
    this.id = document.postId;
    this.userId = document.userId;
    this.description = document.description;
    this.createdAt = document.createdAt;
    this.likes = document.likes;
    this.likedUserIds = document.likedUserIds || [];
    this.commentsIds = document.commentsIds || [];
    this.images = document.images?.map((img) => `data:image/webp;base64,${img.data.toString('base64')}`) || [];
  }
}

export { PostDto };
