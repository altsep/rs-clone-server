import { getPost } from './getPost';
import { getPosts } from './getPosts';
import { handleAddPost as addPost } from './addPost';
import { updatePost } from './updatePost';
import { removePost } from './removePost';

const prodPostsController = { getPost, getPosts, addPost, updatePost, removePost };

export { prodPostsController };
