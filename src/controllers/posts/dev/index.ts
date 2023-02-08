import { getPost } from './getPost';
import { getPosts } from './getPosts';
import { addPost } from './addPost';
import { updatePost } from './updatePost';
import { removePost } from './removePost';

const devPostsController = { getPost, getPosts, addPost, updatePost, removePost };

export { devPostsController };
