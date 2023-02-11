import { CommentDto } from '../../dtos/comment-dto';
import { commentModel } from '../../models/comment-model';
import type { Post } from '../../types';

export const getAllComments = async (): Promise<Post[]> => {
  const posts = await commentModel.find();
  return posts.map((p) => new CommentDto(p));
};
