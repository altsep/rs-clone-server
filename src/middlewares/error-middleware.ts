import { ErrorRequestHandler } from 'express';
import { getStatusCode } from 'http-status-codes';
import { handleError } from '../utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  let data;

  try {
    if (err instanceof Error) {
      const statusCode = getStatusCode(err.message);
      data = handleError(req.originalUrl, statusCode);
    }
  } catch (statusCodeError) {
    data = handleError(req.originalUrl);

    if (err instanceof Error) {
      data.message = err.message;
    }
  }

  if (data) {
    res.status(data.status).send(data);
  }

  console.error(err);
};
