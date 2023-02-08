import { Handler } from 'express';
import { db } from '../../db';

export const getPosts: Handler = (_req, res) => {
  const { posts } = db;
  res.send(posts);
};
