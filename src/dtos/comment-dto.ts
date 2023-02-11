import { CommentSchema } from '../models/types';

class CommentDto {
  public id: number;

  public postId: number;

  public userId: number;

  public description: string;

  public createdAt: string;

  public likes: number;

  public likedUserIds: number[];

  constructor(document: CommentSchema) {
    this.id = document.commentId;
    this.postId = document.postId;
    this.userId = document.userId;
    this.description = document.description;
    this.createdAt = document.createdAt;
    this.likes = document.likes;
    this.likedUserIds = document.likedUserIds || [];
  }
}

export { CommentDto };
