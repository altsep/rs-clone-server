import { Handler } from 'express';
import { getAllPosts } from '../../services/post/getAllPosts';

export const getPosts: Handler = (_req, res, next) => {
  getAllPosts()
    .then((posts) => res.send(posts))
    .catch((e) => next(e));
};
