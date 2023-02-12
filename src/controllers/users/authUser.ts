import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

export const authUser: Handler = (_req, res) => {
  res.redirect(StatusCodes.TEMPORARY_REDIRECT, '/api/login');
};
