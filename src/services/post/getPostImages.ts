import { postModel } from '../../models/post-model';
import { Util } from '../../util/Util';

export const getPostImages = async (postId: number): Promise<string[]> => {
  const post = await postModel.findOne({ postId }).select('images');

  if (!post || !post.images) {
    throw new Error('Not Found');
  }

  const images = post.images.map(Util.getDataUrl);

  return images;
};
