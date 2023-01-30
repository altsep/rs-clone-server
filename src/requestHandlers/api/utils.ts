import { Response, NextFunction, Request } from 'express';

const handleError = (req: Request, res: Response, next: NextFunction, message: string, status = 500): void => {
  const { originalUrl } = req;
  const err = { error: true, message, status, instance: originalUrl };

  res.status(status).send(err);
  next(message);
};

export { handleError };
