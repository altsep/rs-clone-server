import { Handler } from 'express';
import { app } from '../../../app';
import { db } from '../../../db';

const getUsers: Handler = (_req, res) => {
  const { users } = db;
  res.send(users);
};

app.get('/api/users', getUsers);
