import { handleGetPost as getPost } from './getPost';
import { getPosts } from './getPosts';
import { handleAddPost as addPost } from './addPost';
import { handleUpdatePost as updatePost } from './updatePost';
import { handleRemovePost as removePost } from './removePost';

const postsController = { getPost, getPosts, addPost, updatePost, removePost };

export { postsController };
