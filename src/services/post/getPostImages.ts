import { postModel } from '../../models/post-model';
import { getImageBase64String } from '../../utils';

export const getPostImages = async (postId: number): Promise<string[]> => {
  const post = await postModel.findOne({ postId });

  if (!post || !post.images) {
    throw new Error('Not Found');
  }

  const images = post.images.map(getImageBase64String);

  return images;
};
