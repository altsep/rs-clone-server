import { CommentDto } from '../../dtos/comment-dto';
import { commentModel } from '../../models/comment-model';
import { Comment } from '../../types';

export const addComment = async (data: Comment): Promise<Comment> => {
  const count = await commentModel.estimatedDocumentCount();

  const comment = await commentModel.create({ ...data, commentId: count + 1 });

  const commentDto = new CommentDto(comment);

  return commentDto;
};
