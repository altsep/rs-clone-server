import { Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { getReasonPhrase } from 'http-status-codes';

interface IErrorHandlerData {
  error: boolean;
  message: string;
  status: number;
  instance: string;
  errors: ValidationError[];
}

const handleError = (instance = '', status = 500, errors: ValidationError[] = []): IErrorHandlerData => {
  const message = getReasonPhrase(status);
  const data = { error: true, status, message, instance, errors };
  return data;
};

const handleValidationResult = (req: Request, res: Response): boolean => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const data = handleError(req.originalUrl, 400, errors.array());
    res.status(data.status).send(data);
  }

  return errors.isEmpty();
};

const getIsoString = (date: number | string = Date.now()): string => new Date(date).toISOString();

const generateHexStr = (amount = 24): string => {
  let res = '';
  for (let i = 0; i < amount; i += 1) {
    res += Math.floor(Math.random() * 0x10).toString(16);
  }
  return res;
};

const getActionString = (type: string, payload: unknown): string => JSON.stringify({ type, payload });

export { handleError, handleValidationResult, getIsoString, generateHexStr, getActionString };
