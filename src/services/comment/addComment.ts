import { CommentDto } from '../../dtos/comment-dto';
import { commentModel } from '../../models/comment-model';
import { Comment } from '../../types';

export const addComment = async (data: Comment): Promise<Comment> => {
  const lastComment = await commentModel.findOne().sort({ commentId: -1 });

  const commentId = lastComment ? lastComment.commentId + 1 : 1;

  const comment = await commentModel.create({ ...data, commentId });

  const commentDto = new CommentDto(comment);

  return commentDto;
};
