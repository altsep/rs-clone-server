import { Handler } from 'express';
import { app } from '../../../app';
import { db } from '../../../db';

const { users } = db;

const getUsersHandler: Handler = (req, res) => {
  const { param } = req.params;
  res.send(users);
};

app.get('/api/users/:id', getUsersHandler);
