import { postModel } from '../../models/post-model';
import { PostSchema } from '../../models/types';

export const setPostImage = async (postId: number, images: PostSchema['images']): Promise<void> => {
  const post = await postModel.findOne({ postId });

  if (!post) {
    throw new Error('Not Found');
  }

  post.images.push(...images);

  post.hasImages = true;

  await post.save();
};
