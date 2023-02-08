import { Handler } from 'express';
import { db } from '../../db';

export const getUsers: Handler = (_req, res) => {
  const { users } = db;
  res.send(users);
};
