import { PostDto } from '../../dtos/post-dto';
import { postModel } from '../../models/post-model';

export const removePost = async (id: string): Promise<unknown> => {
  const post = await postModel.findOneAndDelete({ postId: Number(id) });

  if (!post) {
    throw new Error('Not Found');
  }

  const postDto = new PostDto(post);

  return postDto;
};
