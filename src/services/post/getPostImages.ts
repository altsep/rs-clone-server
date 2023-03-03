import { postModel } from '../../models/post-model';
import { getDataUrl } from '../../utils';

export const getPostImages = async (postId: number): Promise<string[]> => {
  const post = await postModel.findOne({ postId }).select('images');

  if (!post || !post.images) {
    throw new Error('Not Found');
  }

  const images = post.images.map(getDataUrl);

  return images;
};
