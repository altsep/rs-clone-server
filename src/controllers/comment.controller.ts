/* eslint-disable class-methods-use-this */
import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { addComment } from '../services/comment/addComment';
import { getAllComments } from '../services/comment/getAllComments';
import { getComment } from '../services/comment/getComment';
import { removeComment } from '../services/comment/removeComment';
import { updateComment } from '../services/comment/updateComment';
import { Comment } from '../types';
import { Util } from '../util/Util';

class CommentController {
  public addComment: Handler = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const data = Util.handleError(req.originalUrl, 400, errors.array());
      res.status(data.status).send(data);
      return;
    }

    const data = req.body as Exclude<Comment, 'id'>;

    addComment(data)
      .then((comment) => {
        const status = StatusCodes.CREATED;
        res.status(status).send(comment);
      })
      .catch(next);
  };

  public getComment: Handler = (req, res, next) => {
    const { id } = req.params;

    if (id == null) {
      const data = Util.handleError(req.originalUrl, 400);
      res.status(data.status).send(data);
      return;
    }

    getComment(id)
      .then((post) => res.send(post))
      .catch(next);
  };

  public getAllComments: Handler = (_req, res, next) => {
    getAllComments()
      .then((posts) => res.send(posts))
      .catch(next);
  };

  public updateComment: Handler = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const data = Util.handleError(req.originalUrl, 400, errors.array());
      res.status(data.status).send(data);
      return;
    }

    const { id } = req.params;
    const postProps = req.body as Partial<Comment>;

    updateComment(id, postProps)
      .then((updatedComment) => res.send(updatedComment))
      .catch(next);
  };

  public removeComment: Handler = (req, res, next) => {
    const { originalUrl } = req;
    const { id } = req.params;

    removeComment(id)
      .then(() => {
        const data = { success: true, instance: originalUrl };
        res.send(data);
      })
      .catch(next);
  };
}

export const commentController = new CommentController();
