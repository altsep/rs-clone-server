import { PostDto } from '../../dtos/post-dto';
import { postModel } from '../../models/post-model';
import { Post } from '../../types';

export const setPostImage = async (postId: number, data: Buffer, contentType: string): Promise<Post> => {
  const post = await postModel.findOne({ postId });

  if (!post) {
    throw new Error('Not Found');
  }

  const img = { data, contentType };
  post.images.push(img);

  await post.save();

  const postDto = new PostDto(post);

  return postDto;
};
