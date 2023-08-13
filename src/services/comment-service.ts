/* eslint-disable class-methods-use-this */
import { CommentDto } from '../dtos/comment-dto';
import { commentModel } from '../models/comment-model';
import { Comment, Post } from '../types';

class CommentService {
  public addComment = async (data: Comment): Promise<Comment> => {
    const lastComment = await commentModel.findOne().sort({ commentId: -1 });

    const commentId = lastComment ? lastComment.commentId + 1 : 1;

    const comment = await commentModel.create({ ...data, commentId });

    const commentDto = new CommentDto(comment);

    return commentDto;
  };

  public getComment = async (id: string): Promise<Post> => {
    const comment = await commentModel.findOne({ commentId: Number(id) });

    if (!comment) {
      throw new Error('Not Found');
    }

    const commentDto = new CommentDto(comment);

    return commentDto;
  };

  public getAllComments = async (): Promise<Post[]> => {
    const posts = await commentModel.find();
    return posts.map((p) => new CommentDto(p));
  };

  public updateComment = async (id: string, data: Partial<Post>): Promise<Post> => {
    const comment = await commentModel.findOneAndUpdate({ commentId: Number(id) }, data, { new: true });

    if (!comment) {
      throw new Error('Not Found');
    }

    const commentDto = new CommentDto(comment);

    return commentDto;
  };

  public removeComment = async (id: string): Promise<unknown> => {
    const comment = await commentModel.findOneAndDelete({ commentId: Number(id) });

    if (!comment) {
      throw new Error('Not Found');
    }

    const commentDto = new CommentDto(comment);

    return commentDto;
  };
}

export const commentService = new CommentService();
