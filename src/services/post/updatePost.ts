import { PostDto } from '../../dtos/post-dto';
import { postModel } from '../../models/post-model';
import type { Post } from '../../types';

export const updatePost = async (id: string, data: Partial<Post>): Promise<Post> => {
  const post = await postModel.findOneAndUpdate({ postId: Number(id) }, data, { new: true });

  if (!post) {
    throw new Error('Not Found');
  }

  const postDto = new PostDto(post);

  return postDto;
};
