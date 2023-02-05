import { Response, Request } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Post, User } from '../types';

interface IErrorHandlerOptions {
  req: Request;
  res: Response;
  message?: string;
  status?: number;
}

const handleError = (options: IErrorHandlerOptions): void => {
  options.status = options.status || StatusCodes.INTERNAL_SERVER_ERROR;
  options.message = options.message || ReasonPhrases.INTERNAL_SERVER_ERROR;
  const { req, res, message, status } = options;
  const { originalUrl } = req;

  const data = { error: true, message, status, instance: originalUrl };

  res.status(status).send(data);
};

const hasWrongKeys = (
  props: Partial<User<string | number>> | Partial<Post<string | number>>,
  requiredKeyArr: string[]
): boolean => Object.keys(props).some((k) => !requiredKeyArr.includes(k));

const hasKeysMissing = (
  props: Partial<User<string | number>> | Partial<Post<string | number>>,
  requiredKeyArr: string[]
): boolean => requiredKeyArr.some((k) => !Object.hasOwn(props, k));

const getIsoString = (date: number | string = Date.now()): string => new Date(date).toISOString();

export type { IErrorHandlerOptions as ErrorHandlerOptions };

export { handleError, hasWrongKeys, hasKeysMissing, getIsoString };
