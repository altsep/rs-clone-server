import { PostDto } from '../../dtos/post-dto';
import { commentModel } from '../../models/comment-model';
import { postModel } from '../../models/post-model';

export const removePost = async (id: string): Promise<unknown> => {
  const postId = Number(id);

  const post = await postModel.findOneAndDelete({ postId });

  if (!post) {
    throw new Error('Not Found');
  }

  await commentModel.deleteMany({ postId });

  const postDto = new PostDto(post);

  return postDto;
};
