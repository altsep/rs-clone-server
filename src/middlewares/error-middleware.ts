import { ErrorRequestHandler } from 'express';
import { getStatusCode } from 'http-status-codes';
import { handleError } from '../utils';

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  let data;

  try {
    if (err instanceof Error) {
      const statusCode = getStatusCode(err.message);
      data = handleError(req.originalUrl, statusCode);
    }
  } catch (e) {
    data = handleError(req.originalUrl);

    if (err instanceof Error) {
      data.message = err.message;
    }

    console.log(e);
  }

  if (data) {
    res.status(data.status).send(data);
  }

  next(err);
};
