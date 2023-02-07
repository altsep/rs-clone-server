import { ValidationError } from 'express-validator';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

interface IErrorHandlerData {
  message: string;
  status: number;
  instance: string;
  errors: ValidationError[];
  error: boolean;
}

const handleError = (
  errType = 'INTERNAL_SERVER_ERROR',
  instance = '',
  errors: ValidationError[] = []
): IErrorHandlerData => {
  const status = StatusCodes[errType as keyof typeof StatusCodes];
  const message = ReasonPhrases[errType as keyof typeof ReasonPhrases];
  const data = { status, errors, message, instance, error: true };
  return data;
};

const getIsoString = (date: number | string = Date.now()): string => new Date(date).toISOString();

export { handleError, getIsoString };
