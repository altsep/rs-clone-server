import { Handler, NextFunction, Request, Response } from 'express';

type AsyncMiddleware = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => Handler;

export const asyncMiddleware: AsyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
