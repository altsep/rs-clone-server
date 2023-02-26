import { PostDto } from '../../dtos/post-dto';
import { postModel } from '../../models/post-model';
import type { Post } from '../../types';

export const getAllPosts = async (): Promise<Post[]> => {
  const posts = await postModel.find().select('-images');
  return posts.map((p) => new PostDto(p));
};
