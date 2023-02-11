import { PostDto } from '../../dtos/post-dto';
import { postModel } from '../../models/post-model';
import type { Post } from '../../types';

export const getPost = async (id: string): Promise<Post> => {
  const post = await postModel.findOne({ postId: Number(id) });

  if (!post) {
    throw new Error('Not Found');
  }

  const postDto = new PostDto(post);

  return postDto;
};
