import { Handler } from 'express';
import { app } from '../../../app';
import { db } from '../../../db';

const { posts } = db;

const getPostsHandler: Handler = (_req, res) => {
  res.send(posts);
};

app.get('/api/posts', getPostsHandler);

const postHandler: Handler = (req) => {
  const { text, userId } = req.body as { text: string; userId: number };
};

app.post('/api/posts', postHandler);

const deletePostHandler: Handler = (req) => {
  const { param } = req.params;
};

app.delete('/api/posts/:param', deletePostHandler);
