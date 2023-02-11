import { CommentDto } from '../../dtos/comment-dto';
import { commentModel } from '../../models/comment-model';
import type { Post } from '../../types';

export const getComment = async (id: string): Promise<Post> => {
  const comment = await commentModel.findOne({ commentId: Number(id) });

  if (!comment) {
    throw new Error('Not Found');
  }

  const commentDto = new CommentDto(comment);

  return commentDto;
};
