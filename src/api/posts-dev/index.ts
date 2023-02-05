import { app } from '../../app';
import { getPost } from './handlers/getPost';
import { getPosts } from './handlers/getPosts';
import { addPost } from './handlers/addPost';
import { updatePost } from './handlers/updatePost';
import { removePost } from './handlers/removePost';

app.get('/api/posts', getPosts);

app.post('/api/posts', addPost);

app.get('/api/posts/:id', getPost);

app.patch('/api/posts/:id', updatePost);

app.delete('/api/posts/:id', removePost);
