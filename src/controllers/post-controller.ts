/* eslint-disable class-methods-use-this */
import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { Post } from '../types';
import { Util } from '../util/Util';
import { postService } from '../services/post-service';

class PostController {
  public addPost: Handler = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const data = Util.handleError(req.originalUrl, 400, errors.array());
      res.status(data.status).send(data);
      return;
    }

    const postProps = req.body as Exclude<Post, 'id'>;

    postService
      .addPost(postProps)
      .then((newPost) => {
        const status = StatusCodes.CREATED;
        res.status(status).send(newPost);
      })
      .catch(next);
  };

  public getPost: Handler = (req, res, next) => {
    const { id } = req.params;

    if (id == null) {
      const data = Util.handleError(req.originalUrl, 400);
      res.status(data.status).send(data);
      return;
    }

    postService
      .getPost(id)
      .then((post) => res.send(post))
      .catch(next);
  };

  public getAllPosts: Handler = (_req, res, next) => {
    postService
      .getAllPosts()
      .then((posts) => res.send(posts))
      .catch(next);
  };

  public updatePost: Handler = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const data = Util.handleError(req.originalUrl, 400, errors.array());
      res.status(data.status).send(data);
      return;
    }

    const { id } = req.params;
    const postProps = req.body as Partial<Post>;

    postService
      .updatePost(id, postProps)
      .then((updatedPost) => res.send(updatedPost))
      .catch(next);
  };

  public removePost: Handler = (req, res, next) => {
    const { originalUrl } = req;
    const { id } = req.params;

    postService
      .removePost(id)
      .then(() => {
        const data = { success: true, instance: originalUrl };
        res.send(data);
      })
      .catch(next);
  };
}

export const postController = new PostController();
