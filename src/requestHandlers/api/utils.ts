import { Response, NextFunction, Request } from 'express';

interface Options {
  req: Request;
  res: Response;
  next: NextFunction;
  message: string;
  status?: number;
}

const handleError = (options: Options): void => {
  options.status = options.status || 500;
  const { req, res, next, message, status } = options;
  const { originalUrl } = req;

  const err = { error: true, message, status, instance: originalUrl };

  res.status(status).send(err);

  next(message);
};

export type { Options };

export { handleError };
