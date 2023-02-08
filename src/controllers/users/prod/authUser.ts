import { Handler } from 'express';

export const authUser: Handler = (_req, res) => {
  res.redirect(307, '/api/login');
};
