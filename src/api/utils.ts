import { Response, NextFunction, Request } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

interface Options {
  req: Request;
  res: Response;
  next: NextFunction;
  message?: string;
  status?: number;
}

const handleError = (options: Options): void => {
  options.status = options.status || StatusCodes.INTERNAL_SERVER_ERROR;
  options.message = options.message || ReasonPhrases.INTERNAL_SERVER_ERROR;
  const { req, res, next, message, status } = options;
  const { originalUrl } = req;

  const err = { error: true, message, status, instance: originalUrl };

  res.status(status).send(err);

  next(`${status} ${message}`);
};

export type { Options };

export { handleError };
