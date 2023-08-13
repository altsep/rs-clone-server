import { Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { getReasonPhrase } from 'http-status-codes';
import { ImageSchema } from '../models/types';

interface ErrorHandlerData {
  error: boolean;
  message: string;
  status: number;
  instance: string;
  errors: ValidationError[] | undefined;
}

type HandleError = (instance?: string, status?: number, errors?: ValidationError[] | undefined) => ErrorHandlerData;

export class Util {
  public static handleError: HandleError = (instance = '', status = 500, errors = undefined) => {
    const message = getReasonPhrase(status);
    const data = { error: true, status, message, instance, errors };
    return data;
  };

  public static handleValidationResult = (req: Request, res: Response): boolean => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const data = this.handleError(req.originalUrl, 400, errors.array());
      res.status(data.status).send(data);
    }

    return errors.isEmpty();
  };

  public static getIsoString = (date: number | string = Date.now()): string => new Date(date).toISOString();

  public static generateHexStr = (amount = 24): string => {
    let res = '';
    for (let i = 0; i < amount; i += 1) {
      res += Math.floor(Math.random() * 0x10).toString(16);
    }
    return res;
  };

  public static getActionString = (type: string, payload: unknown): string => JSON.stringify({ type, payload });

  public static getDataUrl = ({ data, contentType }: ImageSchema): string =>
    `data:${contentType};base64,${data.toString('base64')}`;
}
