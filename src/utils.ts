import { ValidationError } from 'express-validator';
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

const getIsoString = (date: number | string = Date.now()): string => new Date(date).toISOString();

const generateHexStr = (amount = 24): string => {
  let res = '';
  for (let i = 0; i < amount; i += 1) {
    res += Math.floor(Math.random() * 0x10).toString(16);
  }
  return res;
};

export { handleError, getIsoString, generateHexStr };
