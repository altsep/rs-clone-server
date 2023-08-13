/* eslint-disable class-methods-use-this */
import { PostDto } from '../dtos/post-dto';
import { commentModel } from '../models/comment-model';
import { postModel } from '../models/post-model';
import { PostSchema } from '../models/types';
import { Post } from '../types';
import { Util } from '../util/Util';

class PostService {
  public addPost = async (data: Post): Promise<Post> => {
    const lastPost = await postModel.findOne().sort({ postId: -1 });

    const postId = lastPost ? lastPost.postId + 1 : 1;

    const post = await postModel.create({ ...data, postId });

    const postDto = new PostDto(post);

    return postDto;
  };

  public getPost = async (id: string): Promise<Post> => {
    const post = await postModel.findOne({ postId: Number(id) }).select('-images');

    if (!post) {
      throw new Error('Not Found');
    }

    const postDto = new PostDto(post);

    return postDto;
  };

  public getAllPosts = async (): Promise<Post[]> => {
    const posts = await postModel.find().select('-images');
    return posts.map((p) => new PostDto(p));
  };

  public getPostImages = async (postId: number): Promise<string[]> => {
    const post = await postModel.findOne({ postId }).select('images');

    if (!post || !post.images) {
      throw new Error('Not Found');
    }

    const images = post.images.map(Util.getDataUrl);

    return images;
  };

  public removePost = async (id: string): Promise<unknown> => {
    const postId = Number(id);

    const post = await postModel.findOneAndDelete({ postId });

    if (!post) {
      throw new Error('Not Found');
    }

    await commentModel.deleteMany({ postId });

    const postDto = new PostDto(post);

    return postDto;
  };

  public updatePost = async (id: string, data: Partial<Post>): Promise<Post> => {
    const post = await postModel.findOneAndUpdate({ postId: Number(id) }, data, { new: true });

    if (!post) {
      throw new Error('Not Found');
    }

    const postDto = new PostDto(post);

    return postDto;
  };

  public setPostImage = async (postId: number, images: PostSchema['images']): Promise<void> => {
    const post = await postModel.findOne({ postId });

    if (!post) {
      throw new Error('Not Found');
    }

    post.images.push(...images);

    post.hasImages = true;

    await post.save();
  };
}

export const postService = new PostService();
