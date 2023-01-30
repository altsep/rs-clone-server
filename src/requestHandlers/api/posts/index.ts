import { Handler } from 'express';
import { app } from '../../../app';
import { db } from '../../../db';

const { posts } = db;

const getPostsHandler: Handler = (_req, res, next) => {
  res.send(posts);
};

app.get('/api/posts', getPostsHandler);

const postHandler: Handler = (req, res, next) => {
  const { text, userId } = req.body as { text: string; userId: number };

  const message = `Post request received from id ${userId}`;
  res.send(message);
};

app.post('/api/posts', postHandler);

const deletePostHandler: Handler = (req, res, next) => {
  const { param } = req.params;

  const message = `Delete post request received for param ${param}`;
  res.send(message);
};

app.delete('/api/posts/:param', deletePostHandler);
