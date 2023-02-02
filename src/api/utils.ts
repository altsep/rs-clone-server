import { Response, Request } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Post, User } from '../types';

interface Options {
  req: Request;
  res: Response;
  message?: string;
  status?: number;
}

const handleError = (options: Options): void => {
  options.status = options.status || StatusCodes.INTERNAL_SERVER_ERROR;
  options.message = options.message || ReasonPhrases.INTERNAL_SERVER_ERROR;
  const { req, res, message, status } = options;
  const { originalUrl } = req;

  const err = { error: true, message, status, instance: originalUrl };

  res.status(status).send(err);
};

const hasWrongKeys = (props: Partial<User> | Partial<Post>, requiredKeyArr: string[]): boolean =>
  Object.keys(props).some((k) => !requiredKeyArr.includes(k));

const hasKeysMissing = (props: Partial<User> | Partial<Post>, requiredKeyArr: string[]): boolean =>
  requiredKeyArr.some((k) => !Object.hasOwn(props, k));

export type { Options };

export { handleError, hasWrongKeys, hasKeysMissing };
