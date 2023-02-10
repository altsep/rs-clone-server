import { PostDto } from '../../dtos/post-dto';
import { postModel } from '../../models/post-model';
import type { Post } from '../../types';

export const addPost = async (data: Post): Promise<Post> => {
  const lastPost = await postModel.findOne().sort({ postId: -1 });
  const postId = lastPost ? lastPost.postId + 1 : 1;
  const post = await postModel.create({ ...data, postId });
  const postDto = new PostDto(post);
  return postDto;
};
