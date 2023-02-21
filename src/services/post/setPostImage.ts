import { postModel } from '../../models/post-model';

export const setPostImage = async (postId: number, data: Buffer, contentType: string): Promise<void> => {
  const post = await postModel.findOne({ postId });

  if (!post) {
    throw new Error('Not Found');
  }

  const img = { data, contentType };
  post.images.push(img);

  await post.save();
};
