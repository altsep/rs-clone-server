import { Handler } from 'express';
import { app } from '../../../app';
import { db } from '../../../db';

const { users } = db;

const getUsersHandler: Handler = (_req, res, next) => {
  console.log(`Get users request received`);
  res.send(users);
};

app.get('/api/users', getUsersHandler);

const postUserHandler: Handler = (req, res, next) => {
  const { alias, userName } = req.body as { alias: string; id: number; userName: string };
  const { originalUrl } = req;

  if (!userName) {
    const errMessage = `POST: incorrect request body, ${originalUrl}`;
    res.status(500).send(errMessage);
    next(errMessage);
    return;
  }

  const exists = users.findIndex((u) => u.userName === userName) !== -1;

  if (exists) {
    const errMessage = `User ${userName} exists`;
    res.status(500).send(errMessage);
    next(errMessage);
    return;
  }

  console.log(`Post user request received`);

  const newUser = { alias: alias || '', userName, id: users.length + 1 };

  users.push(newUser);

  console.log(users);

  res.send(newUser);
};

app.post('/api/users', postUserHandler);

const deleteUserHandler: Handler = (req, res, next) => {
  const { param } = req.params;

  const message = `Delete user request received for param ${param}`;
  res.send(message);
};

app.delete('/api/users/:param', deleteUserHandler);
