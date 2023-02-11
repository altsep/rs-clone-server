import { CommentDto } from '../../dtos/comment-dto';
import { commentModel } from '../../models/comment-model';
import type { Post } from '../../types';

export const updateComment = async (id: string, data: Partial<Post>): Promise<Post> => {
  const comment = await commentModel.findOneAndUpdate({ commentId: Number(id) }, data, { new: true });

  if (!comment) {
    throw new Error('Not Found');
  }

  const commentDto = new CommentDto(comment);

  return commentDto;
};
