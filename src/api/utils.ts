import { ValidationError } from 'express-validator';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

interface IErrorHandlerData {
  message: string;
  status: number;
  instance: string;
  errors: ValidationError[];
}

const handleError = (
  errType = 'INTERNAL_SERVER_ERROR',
  instance = '',
  errors: ValidationError[] = []
): IErrorHandlerData => {
  const status = StatusCodes[errType as keyof typeof StatusCodes];
  const message = ReasonPhrases[errType as keyof typeof ReasonPhrases];

  const data = { errors, message, status, instance };

  return data;
};

const getIsoString = (date: number | string = Date.now()): string => new Date(date).toISOString();

export type { IErrorHandlerData as ErrorHandlerOptions };

export { handleError, getIsoString };
