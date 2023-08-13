import { ErrorRequestHandler } from 'express';
import { getStatusCode } from 'http-status-codes';
import { Util } from '../util/Util';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  let data;

  try {
    if (err instanceof Error) {
      const statusCode = getStatusCode(err.message);
      data = Util.handleError(req.originalUrl, statusCode);
    }
  } catch (statusCodeError) {
    data = Util.handleError(req.originalUrl);

    if (err instanceof Error) {
      data.message = err.message;
    }
  }

  if (data) {
    res.status(data.status).send(data);
  }

  console.error(err);
};
