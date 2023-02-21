import { postModel } from '../../models/post-model';

export const getPostImages = async (postId: number): Promise<string[]> => {
  const post = await postModel.findOne({ postId });

  if (!post || !post.images) {
    throw new Error('Not Found');
  }

  const images = post.images.map(({ data, contentType }) => `data:${contentType};base64,${data.toString('base64')}`);

  return images;
};
