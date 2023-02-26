import { postModel } from '../../models/post-model';
import { PostSchema } from '../../models/types';

export const setPostImage = async (postId: number, images: PostSchema['images']): Promise<string[]> => {
  const post = await postModel.findOne({ postId });

  if (!post) {
    throw new Error('Not Found');
  }

  post.images.push(...images);

  await post.save();

  return images.map(({ data, contentType }) => `data:${contentType};base64,${data.toString('base64')}`);
};
