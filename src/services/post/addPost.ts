import { PostDto } from '../../dtos/post-dto';
import { postModel } from '../../models/post-model';
import type { Post } from '../../types';

export const addPost = async (data: Post): Promise<Post> => {
  const count = await postModel.estimatedDocumentCount();
  const post = await postModel.create({ ...data, postId: count + 1 });
  const postDto = new PostDto(post);
  return postDto;
};
