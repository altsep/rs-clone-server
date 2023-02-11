import { CommentDto } from '../../dtos/comment-dto';
import { commentModel } from '../../models/comment-model';

export const removeComment = async (id: string): Promise<unknown> => {
  const comment = await commentModel.findOneAndDelete({ commentId: Number(id) });

  if (!comment) {
    throw new Error('Not Found');
  }

  const commentDto = new CommentDto(comment);

  return commentDto;
};
