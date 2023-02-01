import { Handler } from 'express';
import { app } from '../../../app';
import { db } from '../../../db';

const { users } = db;

const getUsersHandler: Handler = (_req, res) => {
  res.send(users);
};

app.get('/api/users', getUsersHandler);
